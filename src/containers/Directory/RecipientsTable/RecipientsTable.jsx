import cx from 'classnames'
import { compose, withHandlers, withProps } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import { Table } from '@frankmoney/components'
import RecipientRow from 'components/RecipientRow'
import {
  recipientsDataSourceSelector,
  recipientsRowDataSelector,
} from '../selectors'

const TABLE_NAME = 'recipients'

const styles = {
  recipientsTable: {
    width: props => props.grid.fixed.getColumnSpanWidth(6),
  },
  tableHeaderClassName: {
    height: 77,
    padding: [0, 10],
  },
  tableCorners: {
    // boxShadow: 'none',
  },
}

const ConnectedRow = compose(
  withHandlers({
    onEdit: props => () => {
      props.tableExpandRow({ name: TABLE_NAME, rowId: props.rowId })
    },
  })
)(RecipientRow)

// const recipientsDataSourceSelector = () => []

// const recipientsRowDataSelector = () => []

const tableProps = props => ({
  name: TABLE_NAME,
  className: cx(props.className, props.classes.recipientsTable),
  rowComponent: ConnectedRow,
  canAddRows: false,
  noClickAway: true,
  tableHeaderClassName: props.classes.tableHeaderClassName,
  tableGroupSectionClassName: props.classes.tableCorners,
  dataSourceSelector: recipientsDataSourceSelector,
  rowDataSelector: recipientsRowDataSelector,
})

export default compose(
  injectStyles(styles, { fixedGrid: true }),
  withProps(tableProps)
)(Table)
