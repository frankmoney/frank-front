import { Breadcrumbs as DefaultBreadcrumbs } from '@frankmoney/components'
import { ArrowForward as SeparatorIcon } from 'material-ui-icons'
import { withProps } from 'recompose'

export default withProps({
  separatorComponent: SeparatorIcon,
})(DefaultBreadcrumbs)
