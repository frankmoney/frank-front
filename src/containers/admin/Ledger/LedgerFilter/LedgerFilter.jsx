import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { Sort as IconFilter } from 'material-ui-icons'
import reconnect from 'utils/reconnect'
import FilterDrawer from 'containers/admin/Filters/FiltersDrawer'
import { injectStyles } from 'utils/styles'
import * as ACTIONS from '../actions'
import { currentFiltersCountSelector } from '../selectors'

const styles = theme => ({
  root: {
    ...theme.fontMedium(18, 26),
    color: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      color: '#000',
    },
  },
  icon: {
    marginRight: 15,
  },
  counter: {
    ...theme.fontMedium(14, 26),
    backgroundColor: '#484DE7',
    borderRadius: 13,
    color: '#fff',
    height: 25,
    marginLeft: 20,
    minWidth: 25,
    padding: [0, 8],
    textAlign: 'center',
  },
})

class LedgerFilter extends React.Component {
  render() {
    const { classes, className, filtersCount, openDrawer } = this.props
    return (
      <>
        <div
          className={cx(classes.root, className)}
          onClick={() => openDrawer()}
        >
          <IconFilter className={classes.icon} />
          Filter
          {filtersCount > 0 && (
            <div className={classes.counter}>{filtersCount}</div>
          )}
        </div>
        <FilterDrawer />
      </>
    )
  }
}

export default compose(
  reconnect(
    {
      filtersCount: currentFiltersCountSelector,
    },
    {
      openDrawer: ACTIONS.filtersOpen,
    }
  ),
  injectStyles(styles)
)(LedgerFilter)
