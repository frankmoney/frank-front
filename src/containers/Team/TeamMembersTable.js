import { injectStyles } from '@frankmoney/ui'
import { Table } from '@frankmoney/components'
import { connect } from 'react-redux'
import { compose, mapProps, withHandlers } from 'recompose'
import { bindActionCreators } from 'redux'
import TeamMembersTableRow from 'components/TeamMembersTableRow'
import ACTIONS from './actions'
import { teamMembersTableDataSelector, teamMemberSelector } from './selectors'

const ConnectedTeamMembersTableRow = compose(
  connect(
    null,
    dispatch =>
      bindActionCreators(
        {
          updateRole: ACTIONS.updateRole,
        },
        dispatch
      )
  ),
  withHandlers({
    onRoleChange: ({ data: { id }, updateRole }) => role =>
      updateRole({ id, role }),
  })
)(TeamMembersTableRow)

const styles = {
  header: {
    paddingBottom: 19,
  },
  detailRow: {
    position: 'relative',
    width: props => props.grid.fixed.contentWidth,
  },
}

const TeamMembersTable = compose(
  injectStyles(styles, { grid: true }),
  mapProps(({ classes, ...otherProps }) => ({
    name: 'teamMembers',
    canSelectRows: false,
    tableHeaderClassName: classes.header,
    tableDetailRowClassName: classes.detailRow,
    rowComponent: ConnectedTeamMembersTableRow,
    // rowDetailViewComponent: TeamMembersTableDetailRow,
    dataSourceSelector: teamMembersTableDataSelector,
    rowDataSelector: teamMemberSelector,
    ...otherProps,
  }))
)(Table)

export default TeamMembersTable
