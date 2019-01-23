import { compose, mapProps, withProps } from 'recompose'
import { Table } from '@frankmoney/components'
import { injectStyles } from 'utils/styles'
import { PaymentsTableRow } from 'components/PaymentsTable'
import PaymentCard from 'containers/admin/PaymentCard'
import reconnect from 'utils/reconnect'
import * as ACTIONS from '../actions'
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
  reconnect(
    {
      categories: paymentCardCategoriesSelector,
    },
    {
      onSimilarDrawerOpen: ACTIONS.openSimilarPaymentsDrawer,
    }
  ),
  mapProps(({ categories, data, onCheck, ...otherProps }) => ({
    categories,
    showSimilarPayments: true,
    ...data,
    ...otherProps,
    // format according table api
    onCheck: isChecked => onCheck && onCheck(otherProps.rowId, isChecked),
  }))
)(PaymentCard)

const CARD_OUTSET = 20

const styles = {
  header: {
    paddingBottom: 19,
  },
  detailRow: {
    width: 850 + CARD_OUTSET * 2,
    // transform creates new layer bringing suggest below to next table group block
    transform: 'unset',
    left: 'unset',
    marginLeft: -CARD_OUTSET,
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
