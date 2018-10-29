import * as R from 'ramda'
import { getFormValues } from 'redux-form/immutable'
import { currentAccountIdSelector } from 'redux/selectors/user'
import createFilesApi from 'data/api/files'
import ACTIONS from '../actions'
import QUERIES from '../queries'
import { isNewStorySelector, storySelector } from '../selectors'
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

export default (action$, store, { http: httpClient, graphql }) =>
  action$
    .ofType(ACTIONS.createOrUpdate)
    .switchMapFromPromise(async () => {
      const state = store.getState()
      const accountId = currentAccountIdSelector(state)
      const isNew = isNewStorySelector(state)
      const storyId = !isNew && storySelector(state).id

      const {
        title,
        description,
        coverImage,
        coverCrop,
        payments,
      } = getFormValues(FORM_NAME)(state).toJS()

      const serializeImage = R.omit(['loading'])
      const croppedCover =
        coverImage && coverImage.length
          ? JSON.stringify(
              await cropCoverImage(httpClient, {
                image: serializeImage(coverImage[0]),
                crop: coverCrop,
              })
            )
          : null

      const storyData = {
        accountId,
        storyId,
        title: title || '',
        body: JSON.stringify(description ? { text: description } : {}),
        coverImage: croppedCover,
        paymentsIds: payments && R.map(R.prop('id'), payments),
      }

      return graphql(
        QUERIES.storyСreateOrUpdate({
          isNew,
        }),
        storyData
      )
    })
    .map(ACTIONS.createOrUpdate.success)
