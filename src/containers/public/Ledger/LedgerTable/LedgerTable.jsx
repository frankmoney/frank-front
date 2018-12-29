import { compose, withPropsOnChange, mapProps, pure } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import { Table } from '@frankmoney/components'
import { PaymentsTableRow } from 'components/PaymentsTable'
import PaymentCard from 'components/public/PaymentCard'
import { dataSourceSelector, rowDataSelector } from '../selectors'

const ComposedPaymentsTableRow = withPropsOnChange(
  ['data'],
  ({ data: { description, peer, verified, category, ...otherData } }) => ({
    tablePadding: 30,
    data: {
      ...otherData,
      verified,
      description: verified ? description : null,
      peer: verified ? peer : null,
      category: verified ? category : null,
    },
  })
)(PaymentsTableRow)

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
