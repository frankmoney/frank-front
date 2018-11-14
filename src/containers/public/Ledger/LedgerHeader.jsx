import React from 'react'
import { compose } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import reconnect from 'utils/reconnect'
import Header from 'components/public/Header'
import * as ACTIONS from './actions'
import { nameSelector } from './selectors'
import LedgerTabs from './LedgerTabs'
import FilterButton from './FilterButton'

const styles = theme => ({
  root: {
    padding: [0, 20],
  },
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  name: {
    ...theme.fontMedium(20, 24),
    color: theme.colors.black,
  },
})

const LedgerHeader = ({ classes, name, offset }) => (
  <Header className={classes.root} offset={offset}>
    <div className={classes.container}>
      <div className={classes.name}>{name}</div>
      <LedgerTabs className={classes.tabs} />
      <FilterButton />
    </div>
  </Header>
)

export default compose(
  reconnect(
    {
      name: nameSelector,
    },
    {
      onToggleFilter: ACTIONS.filtersOpen,
    }
  ),
  injectStyles(styles)
)(LedgerHeader)
