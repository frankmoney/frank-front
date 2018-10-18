import { PageLoader } from '@frankmoney/components'
import { compose, withProps } from 'recompose'
import { injectStyles } from '@frankmoney/ui'

const styles = {
  grayPageLoader: {
    background: '#E5E5E5',
  },
}

export default compose(
  injectStyles(styles),
  withProps(props => ({
    className: props.classes.grayPageLoader,
  }))
)(PageLoader)
