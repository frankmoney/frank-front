// @flow strict-local
import React from 'react'
import { compose } from 'recompose'
import IconArrowUp from 'material-ui-icons/ArrowUpward'
import Header from 'components/public/Header'
import reconnect from 'utils/reconnect'
import { injectStyles } from 'utils/styles'
import * as ACTIONS from './actions'
import { nameSelector } from './selectors'
import FilterButton from './FilterButton'

const styles = theme => ({
  root: {
    padding: [0, 30],
  },
  container: {
    display: 'flex',
    flex: 1,
    position: 'relative',
  },
  toTop: {
    ...theme.fontMedium(18, 28),
    cursor: 'pointer',
    color: '#9195A1',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  arrow: {
    marginRight: 10,
  },
  title: {
    ...theme.fontMedium(20, 32),
    color: theme.colors.black,
    flex: 1,
    textAlign: 'center',
    position: 'relative',
    top: -1,
  },
  filter: {
    position: 'absolute',
    top: -3,
    right: 1,
  },
})

const scrollToTop = () => window.scrollTo(0, 0)

const LedgerHeader = ({ classes, name, offset }) => (
  <Header className={classes.root} offset={offset}>
    <div className={classes.container}>
      <div className={classes.toTop} onClick={scrollToTop}>
        <IconArrowUp className={classes.arrow} />
        To top
      </div>
      <div className={classes.title}>{name}</div>
      <FilterButton className={classes.filter} />
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
