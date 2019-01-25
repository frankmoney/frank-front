import cx from 'classnames'
import { compose, withHandlers, withProps } from 'recompose'
import { connect } from 'react-redux'
import { injectStyles } from '@frankmoney/ui'
import { Table } from '@frankmoney/components'
import RecipientRow from 'components/RecipientRow'
import { currentAccountIdSelector } from 'redux/selectors/user'
import {
  dataSourceSelector,
  rowDataSelector,
  searchTextSelector,
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
  connect(state => ({
    accountId: currentAccountIdSelector(state),
    searchText: searchTextSelector(state),
  })),
  withHandlers({
    onEdit: props => () => {
      props.tableExpandRow({ name: TABLE_NAME, rowId: props.rowId })
    },
  })
)(RecipientRow)

const tableProps = props => ({
  name: TABLE_NAME,
  className: cx(props.className, props.classes.recipientsTable),
  rowComponent: ConnectedRow,
  canAddRows: false,
  noClickAway: true,
  tableHeaderClassName: props.classes.tableHeaderClassName,
  tableGroupSectionClassName: props.classes.tableCorners,
  dataSourceSelector,
  rowDataSelector,
})

export default compose(
  injectStyles(styles, { fixedGrid: true }),
  withProps(tableProps)
)(Table)
