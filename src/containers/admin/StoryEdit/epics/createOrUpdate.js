// @flow strict-local
import * as R from 'ramda'
import { createRouteUrl } from '@frankmoney/utils'
import { push } from 'react-router-redux'
import { getFormValues, stopAsyncValidation } from 'redux-form/immutable'
import { convertToRaw } from 'draft-js'
import createFilesApi from 'data/api/files'
import { currentAccountIdSelector } from 'redux/selectors/user'
import type { ReduxStore } from 'flow/redux'
import { ROUTES } from 'const'
import ACTIONS from '../actions'
import QUERIES from '../queries'
import { storySelector } from '../selectors'
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
  store: ReduxStore,
  { http: httpClient, graphql }: Object // flowlint-line unclear-type:off
) =>
  action$
    .ofType(ACTIONS.createOrUpdate)
    .switchMapFromPromise(async ({ payload: { published } }) => {
      const state = store.getState()
      const accountId = currentAccountIdSelector(state)
      let story = storySelector(state)

      const formValues = getFormValues(FORM_NAME)(state)

      const descriptionContentState = formValues.get('description')

      const { title, cover, coverCrop, payments } = formValues.toJS()

      if (published) {
        const errors = {}

        if (!title || !title.trim()) {
          errors.title = 'Add title to publish'
        }

        if (!descriptionContentState || !descriptionContentState.hasText()) {
          errors.description = 'Add story text to publish'
        }

        if (!payments || !payments.length) {
          errors.payments = 'Attach payments to publish'
        }

        if (Object.keys(errors).length) {
          return [
            ACTIONS.createOrUpdate.error(),
            ACTIONS.showCanNotPublishSnack({ show: true }),
            stopAsyncValidation(FORM_NAME, errors),
          ]
        }
      }

      const body =
        descriptionContentState && descriptionContentState.hasText()
          ? JSON.stringify({
              draftjs: JSON.stringify(convertToRaw(descriptionContentState)),
            })
          : null

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
        published,
        paymentIds,
      }

      if (!story || !story.pid) {
        story = await graphql(QUERIES.createStory, {
          ...queryArgs,
          accountId,
        })
      } else {
        story = await graphql(QUERIES.updateStory, {
          ...queryArgs,
          pid: story.pid,
        })
      }

      const successAction = ACTIONS.createOrUpdate.success({ accountId, story })

      return story.publishedAt
        ? [
            successAction,
            push(createRouteUrl(ROUTES.account.stories.root, { accountId })),
          ]
        : [successAction]
    })
    .mergeMap(R.identity)
    .catchAndRethrow(ACTIONS.createOrUpdate.error)
