import cx from 'classnames'
import FrankRedactor from 'frank-redactor'
import { compose, withProps, withPropsOnChange } from 'recompose'
import { withHttpClient } from '@frankmoney/webapp'
import createFilesApi from 'data/api/files'
import { injectStyles } from 'utils/styles'

const styles = {
  root: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
  },
}

export default compose(
  withHttpClient,
  injectStyles(styles),
  withProps(props => ({
    uiColor: '#20284A',
    className: cx(props.className, props.classes.root),
  })),
  withPropsOnChange(['httpClient'], props => ({
    imageUpload: async file => {
      const image = await createFilesApi(props.httpClient).uploadImage(file)
      return image.sized
    },
  }))
)(FrankRedactor)
