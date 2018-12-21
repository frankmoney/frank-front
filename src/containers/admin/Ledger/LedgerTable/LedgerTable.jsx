import { compose, mapProps, withProps } from 'recompose'
import { Table } from '@frankmoney/components'
import { injectStyles } from 'utils/styles'
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
  canEdit: true,
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

const CARD_OUTSET = 20

const styles = {
  header: {
    paddingBottom: 19,
  },
  detailRow: {
    width: 850 + CARD_OUTSET * 2,
  },
}

export default compose(
  injectStyles(styles),
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
