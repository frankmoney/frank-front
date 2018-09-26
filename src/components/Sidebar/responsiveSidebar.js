import { withGrid } from '@frankmoney/grid'
import { compose, withPropsOnChange } from 'recompose'

export default compose(
  withGrid,
  withPropsOnChange(['grid'], ({ grid }) => ({
    overlayOn: !grid.isSidebarShown,
    width: grid.sidebarWidth,
  }))
)
