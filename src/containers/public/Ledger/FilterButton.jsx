// @flow strict-local
import React from 'react'
import reconnect from 'utils/reconnect'
import PageFilter from 'components/PageFilter'
import * as ACTIONS from './actions'
import { currentFiltersCountSelector } from './selectors'

const FilterButton = ({ className, filtersCount, onToggleFilter }) => (
  <PageFilter
    noLabel={!filtersCount}
    count={filtersCount}
    onClick={onToggleFilter}
    className={className}
  />
)

export default reconnect(
  {
    filtersCount: currentFiltersCountSelector,
  },
  {
    onToggleFilter: ACTIONS.filtersOpen,
  }
)(FilterButton)
