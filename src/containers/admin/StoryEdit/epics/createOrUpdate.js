// @flow strict-local
import * as R from 'ramda'
import { createRouteUrl } from '@frankmoney/utils'
import { replace as replaceLocation } from 'react-router-redux'
import { getFormValues } from 'redux-form/immutable'
import { currentAccountIdSelector } from 'redux/selectors/user'
import { ROUTES } from 'const'
import createFilesApi from 'data/api/files'
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
  store: Object, // flowlint-line unclear-type:off
  { http: httpClient, graphql }: Object // flowlint-line unclear-type:off
) =>
  action$
    .ofType(ACTIONS.createOrUpdate)
    .switchMapFromPromise(async ({ payload }) => {
      const state = store.getState()
      const isNew = isNewStorySelector(state)
      const isDirty = isDirtySelector(state)

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

        const paymentPids = payments && payments.map(R.prop('pid'))

        const queryArgs = {
          title,
          cover: croppedCover,
          body,
          paymentPids,
        }

        if (isNew) {
          const accountPid = currentAccountIdSelector(state)

          story = await graphql(QUERIES.createStory, {
            ...queryArgs,
            accountPid,
          })
        } else {
          const pid = storySelector(state).draft.pid

          story = await graphql(QUERIES.updateStoryDraft, {
            ...queryArgs,
            pid,
          })
        }
      }

      if (payload && payload.publish) {
        const draftPid = story.draft.pid

        story = await graphql(QUERIES.publishStoryDraft, { draftPid })
      }

      return {
        story,
        published: payload && payload.publish,
      }
    })
    .mergeMap(({ story, published }) =>
      R.filter(R.identity, [
        ACTIONS.createOrUpdate.success({ story }),
        published && ACTIONS.publish.success({ story }),
        published &&
          replaceLocation(createRouteUrl(ROUTES.manage.stories.root)),
      ])
    )
