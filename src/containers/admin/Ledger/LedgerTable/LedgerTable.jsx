import { compose, mapProps, withProps, withHandlers } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import { Table } from '@frankmoney/components'
import { PaymentsTableRow } from 'components/PaymentsTable'
import PaymentCard from 'containers/admin/PaymentCard'
import reconnect from 'utils/reconnect'
import {
  dataSourceSelector,
  rowDataSelector,
  paymentCardCategoriesSelector,
} from '../selectors'

const ComposedPaymentsTableRow = withProps({
  tablePadding: 30,
  canView: true,
  canEdit: true,
  tall: true,
})(PaymentsTableRow)

const ConnectedPaymentsTableDetailRow = compose(
  reconnect({
    categories: paymentCardCategoriesSelector,
  }),
  mapProps(({ categories, data, ...otherProps }) => ({
    categories,
    ...data,
    ...otherProps,
  }))
)(PaymentCard)

const styles = {
  header: {
    paddingBottom: 19,
  },
  detailRow: {
    width: props => props.grid.fixed.contentWidth,
    position: 'unset',
    left: 'unset',
    transform: 'unset',
  },
}

export default compose(
  injectStyles(styles, { grid: true }),
  mapProps(({ classes, ...props }) => ({
    name: 'ledger',
    canSelectRows: true,
    tableHeaderClassName: classes.header,
    tableDetailRowClassName: classes.detailRow,
    rowComponent: ComposedPaymentsTableRow,
    rowDetailViewComponent: ConnectedPaymentsTableDetailRow,
    dataSourceSelector,
    rowDataSelector,
    ...props,
  }))
)(Table)
