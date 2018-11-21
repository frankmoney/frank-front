import React from 'react'
import reconnect from 'utils/reconnect'
import PageFilter from 'components/PageFilter'
import FilterDrawer from 'containers/admin/Filters/FiltersDrawer'
import ACTIONS from './actions'
import { currentFiltersCountSelector } from './selectors'

const LedgerFilter = ({ filtersCount, openDrawer }) => (
  <>
    <PageFilter count={filtersCount} onClick={openDrawer} />
    <FilterDrawer disableVerifiedFilter />
  </>
)

export default reconnect(
  {
    filtersCount: currentFiltersCountSelector,
  },
  {
    openDrawer: ACTIONS.filtersOpen,
  }
)(LedgerFilter)
