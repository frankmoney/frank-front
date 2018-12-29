import PropTypes from 'prop-types'
import { compose, getContext, withPropsOnChange } from 'recompose'
import { readFileData } from '@frankmoney/components'
import * as R from 'ramda'
import Editor from 'components/kit/Editor'
import createFilesApi from 'data/api/files'

const readImageWidth = async file => {
  const fileData = await readFileData(file)
  const image = new Image()
  return new Promise(resolve => {
    image.onload = function() {
      resolve(this.width)
    }
    image.src = fileData
  })
}

// link editor to server image upload
export default compose(
  getContext({ httpClient: PropTypes.func.isRequired }),
  withPropsOnChange(['httpClient'], props => ({
    imageUpload: async (file, ...args) => {
      const width = await readImageWidth(file)
      const sizeProp = R.prop(width < 850 ? 'original' : 'sized')

      return createFilesApi(props.httpClient)
        .uploadImage(file, ...args)
        .then(sizeProp)
    },
  }))
)(Editor)
