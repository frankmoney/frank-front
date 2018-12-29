import { compose, withProps, mapProps, pure } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import { Table } from '@frankmoney/components'
import { PaymentsTableRow } from 'components/PaymentsTable'
import PaymentCard from 'components/public/PaymentCard'
import { dataSourceSelector, rowDataSelector } from '../selectors'

const ComposedPaymentsTableRow = withProps({
  tablePadding: 30,
})(PaymentsTableRow)

const ConnectedPaymentsTableDetailRow = compose(
  mapProps(({ data, ...otherProps }) => ({
    paperPadding: 40,
    ...data,
    ...otherProps,
  })),
  pure
)(PaymentCard)

const styles = {
  header: {
    paddingBottom: 19,
  },
  detailRow: {
    width: 660 + 10 * 2,
    position: 'relative',
  },
}

export default compose(
  injectStyles(styles, { grid: true }),
  mapProps(({ classes, ...props }) => ({
    name: 'publicLedger',
    tableHeaderClassName: classes.header,
    tableDetailRowClassName: classes.detailRow,
    rowComponent: ComposedPaymentsTableRow,
    rowDetailViewComponent: ConnectedPaymentsTableDetailRow,
    dataSourceSelector,
    rowDataSelector,
    ...props,
  }))
)(Table)
