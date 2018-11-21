import React from 'react'
// import LedgerFilterDrawer from 'components/drawers/LedgerFilterDrawer'
import reconnect from 'utils/reconnect'
import * as ACTIONS from '../actions'
import {
  filtersDataSelector,
  filtersEstimatedResultsCountSelector,
  isFiltersEstimatingSelector,
  isFiltersLoadedSelector,
  isFiltersOpenSelector,
} from '../selectors'

const LedgerFilter = ({
  open,
  estimatedResultsCount,
  filtersData,
  closeDrawer,
  changeFilters,
  resetFilters,
  applyFilters,
  estimating,
  loaded,
}) =>
  // TODO
  null
// {/*<LedgerFilterDrawer*/}
//   {/*open={open}*/}
//   {/*loaded={loaded}*/}
//   {/*onClose={() => closeDrawer()}*/}
//   {/*onReset={() => resetFilters()}*/}
//   {/*onChange={changeFilters}*/}
//   {/*onApply={applyFilters}*/}
//   {/*totalCount={estimatedResultsCount}*/}
//   {/*totalCountEstimating={estimating}*/}
//   {/*{...filtersData}*/}
// {/*/>*/}

export default reconnect(
  {
    loaded: isFiltersLoadedSelector,
    open: isFiltersOpenSelector,
    estimating: isFiltersEstimatingSelector,
    estimatedResultsCount: filtersEstimatedResultsCountSelector,
    filtersData: filtersDataSelector,
  },
  {
    closeDrawer: ACTIONS.filtersClose,
    applyFilters: ACTIONS.filtersApply,
    changeFilters: ACTIONS.filtersChange,
    resetFilters: ACTIONS.filtersReset,
  }
)(LedgerFilter)
