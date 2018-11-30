import { compose, withProps, mapProps, withStateHandlers } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import { Table } from '@frankmoney/components'
import { PaymentsTableRow } from 'components/PaymentsTable'
import PaymentCard from 'components/public/PaymentCard'
import { dataSourceSelector, rowDataSelector } from '../selectors'

const ComposedPaymentsTableRow = withProps(({ data: { verified } }) => ({
  tablePadding: 30,
  canView: verified,
  short: !verified,
  tall: verified,
}))(PaymentsTableRow)

const ConnectedPaymentsTableDetailRow = compose(
  withStateHandlers(({ data }) => ({
    ...data,
  })),
  withProps({ paperPadding: 40 })
)(PaymentCard)

const styles = {
  header: {
    paddingBottom: 19,
  },
  detailRow: {
    width: 680,
    position: 'relative',
  },
}

export default compose(
  injectStyles(styles, { grid: true }),
  mapProps(({ classes, ...props }) => ({
    name: 'ledger',
    canSelectRows: false,
    tableHeaderClassName: classes.header,
    tableDetailRowClassName: classes.detailRow,
    rowComponent: ComposedPaymentsTableRow,
    rowDetailViewComponent: ConnectedPaymentsTableDetailRow,
    dataSourceSelector,
    rowDataSelector,
    ...props,
  }))
)(Table)
