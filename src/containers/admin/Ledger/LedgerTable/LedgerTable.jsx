import { compose, mapProps, withProps, withHandlers } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import { Table } from '@frankmoney/components'
import { PaymentsTableRow } from 'components/PaymentsTable'
import PaymentCard from 'components/admin/PaymentCard'
import reconnect from 'utils/reconnect'
import { currentAccountIdSelector } from 'redux/selectors/user'
import {
  dataSourceSelector,
  rowDataSelector,
  paymentCardCategoriesSelector,
  isPaymentSavingSelector,
  isPaymentPublishingSelector
} from '../selectors'
import * as ACTIONS from '../actions'

const ComposedPaymentsTableRow = compose(
  withProps({
    type: 'admin',
  })
)(PaymentsTableRow)

const ConnectedPaymentsTableDetailRow = compose(
  reconnect(
    (_, initialProps) => ({
      categories: paymentCardCategoriesSelector,
      accountId: currentAccountIdSelector,
      saving: isPaymentSavingSelector(initialProps.rowId),
      publishing: isPaymentPublishingSelector(initialProps.rowId),
    }),
    {
      paymentUpdate: ACTIONS.paymentUpdate,
    }
  ),
  mapProps(({ categories, peers, data, ...otherProps }) => ({
    categories,
    peers,
    ...data,
    ...otherProps,
  })),
  withHandlers({
    onPaymentSave: ({ paymentUpdate }) => changes => {
      paymentUpdate(changes)
    },
    onPaymentPublish: ({ paymentUpdate }) => changes => {
      paymentUpdate({ ...changes, publish: true })
    },
    onPaymentUnpublish: ({ paymentUpdate }) => changes => {
      paymentUpdate({ ...changes, unpublish: true })
    },
  })
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
