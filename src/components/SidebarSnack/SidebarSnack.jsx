import { withSidebar } from '@frankmoney/components'
import { compose, mapProps, pure } from 'recompose'
import Snack from 'components/kit/Snack'

export default compose(
  withSidebar,
  mapProps(({ sidebar, ...otherProps }) => ({
    viewportOffsetHorizontal: 10 + (sidebar.open ? sidebar.width : 0),
    ...otherProps,
  })),
  pure
)(Snack)
