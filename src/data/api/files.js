import noop from 'lodash/noop'

export default client => ({
  async uploadImage(fileOrUrl, progressReporter = noop, options = {}) {
    if (__SERVER) {
      throw new Error('uploadImage() is not implemented on server side')
    }
    const data = new FormData()
    Object.entries(options).forEach(([k, v]) => {
      data.append(k, v)
    })
    if (typeof fileOrUrl === 'string') {
      data.append('image_url', fileOrUrl)
    } else {
      data.append('file', fileOrUrl)
    }

    return client
      .request({
        method: 'post',
        url: '/images_upload',
        data,
        onUploadProgress: progressEvent => {
          progressReporter(
            Math.round(progressEvent.loaded * 100 / progressEvent.total)
          )
        },
      })
      .then(({ images: [thumbs] }) => ({ thumbs }))
  },
})
