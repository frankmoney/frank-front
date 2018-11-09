import * as R from 'ramda'
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { compose } from 'recompose'
import { Sort as IconFilter } from 'material-ui-icons'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import LedgerFilterDrawer from 'components/drawers/LedgerFilterDrawer'
import * as ACTIONS from '../actions'
import {
  filtersDataSelector,
  filtersEstimatedResultsCountSelector,
  isFiltersEstimatingSelector,
  isFiltersLoadedSelector,
  isFiltersOpenSelector,
  paymentsTotalCountSelector,
} from '../selectors'

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
    const {
      classes,
      className,
      open,
      currentResultsCount,
      estimatedResultsCount,
      filtersData,
      openDrawer,
      closeDrawer,
      changeFilters,
      resetFilters,
      applyFilters,
      estimating,
      loaded,
    } = this.props
    return (
      <>
        <div
          className={cx(classes.root, className)}
          onClick={() => openDrawer()}
        >
          <IconFilter className={classes.icon} />
          Filter
          {currentResultsCount > 0 && (
            <div className={classes.counter}>{currentResultsCount}</div>
          )}
        </div>
        <LedgerFilterDrawer
          open={open}
          loaded={loaded}
          onClose={() => closeDrawer()}
          onReset={() => resetFilters()}
          onChange={changeFilters}
          onApply={applyFilters}
          totalCount={estimatedResultsCount}
          totalCountEstimating={estimating}
          {...filtersData}
        />
      </>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  loaded: isFiltersLoadedSelector,
  open: isFiltersOpenSelector,
  estimating: isFiltersEstimatingSelector,
  currentResultsCount: paymentsTotalCountSelector,
  estimatedResultsCount: filtersEstimatedResultsCountSelector,
  filtersData: filtersDataSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    openDrawer: ACTIONS.filtersOpen,
    closeDrawer: ACTIONS.filtersClose,
    applyFilters: ACTIONS.filtersApply,
    changeFilters: ACTIONS.filtersChange,
    resetFilters: ACTIONS.filtersReset,
  },
])

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectStyles(styles)
)(LedgerFilter)
