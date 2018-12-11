// @flow strict-local
import * as R from 'ramda'
import { createRouteUrl } from '@frankmoney/utils'
import { replace as replaceLocation } from 'react-router-redux'
import { getFormValues } from 'redux-form/immutable'
import createFilesApi from 'data/api/files'
import { currentAccountIdSelector } from 'redux/selectors/user'
import type { Store } from 'flow/redux'
import { ROUTES } from 'const'
import ACTIONS from '../actions'
import QUERIES from '../queries'
import {
  isDirtySelector,
  isNewStorySelector,
  storySelector,
} from '../selectors'
import { FORM_NAME } from '../constants'

const cropCoverImage = async (httpClient, { image, crop }) => {
  // if crop area has not changed then return same image
  if (image.crop) {
    if (R.equals(image.crop.sized, crop)) {
      return image
    }
  }
  const filesApi = createFilesApi(httpClient)
  let file
  const isTemporaryOriginal = image.thumbs.original.startsWith('data')

  if (isTemporaryOriginal) {
    file = new File(
      [await fetch(image.thumbs.original).then(x => x.blob())],
      image.name,
      { type: image.type }
    )
  } else {
    file = image.thumbs.original
  }

  const imageFile = await filesApi.uploadImage(file, () => {}, {
    cover: true,
    crop: [crop.left, crop.top, crop.width, crop.height],
  })

  const newImage = {
    ...image,
    crop: {
      sized: crop,
    },
    thumbs: {
      ...imageFile,
    },
  }
  return newImage
}

export default (
  action$: any, // flowlint-line unclear-type:off
  store: Store,
  { http: httpClient, graphql }: Object // flowlint-line unclear-type:off
) =>
  action$
    .ofType(ACTIONS.createOrUpdate)
    .switchMapFromPromise(async ({ payload }) => {
      const state = store.getState()
      const isNew = isNewStorySelector(state)
      const isDirty = isDirtySelector(state)

      const accountId = currentAccountIdSelector(state)

      let story = storySelector(state)

      if (isNew || isDirty) {
        const formValues = getFormValues(FORM_NAME)(state).toJS()

        const { title, description, cover, coverCrop, payments } = formValues

        const body = JSON.stringify(description ? { text: description } : {})

        const serializeImage = R.omit(['loading'])
        const croppedCover =
          cover && cover.length
            ? JSON.stringify(
                await cropCoverImage(httpClient, {
                  image: serializeImage(cover[0]),
                  crop: coverCrop,
                })
              )
            : null

        const paymentIds = payments && payments.map(R.prop('id'))

        const queryArgs = {
          title,
          cover: croppedCover,
          body,
          paymentIds,
        }

        if (isNew) {
          story = await graphql(QUERIES.createStory, {
            ...queryArgs,
            accountId,
          })
        } else {
          const id = storySelector(state).draft.id

          story = await graphql(QUERIES.updateStoryDraft, {
            ...queryArgs,
            id,
          })
        }
      }

      if (payload && payload.publish) {
        const draftId = story.draft.id
        story = await graphql(QUERIES.publishStoryDraft, { draftId })
      }

      return {
        accountId,
        story,
        published: payload && payload.publish,
      }
    })
    .mergeMap(({ accountId, story, published }) =>
      R.filter(R.identity, [
        ACTIONS.createOrUpdate.success({ story }),
        published && ACTIONS.publish.success({ accountId, story }),
        published &&
          replaceLocation(createRouteUrl(ROUTES.manage.stories.root)),
      ])
    )
