import React from 'react'
import * as R from 'ramda'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { CheckedMenuList, CheckedMenuItem } from '@frankmoney/components'
import HeaderFilterWithHint from 'components/HeaderFilterWithHint'
import {
  filterSortBySelectedValueSelector,
  sortByFilterSelector,
} from '../selectors'
import * as ACTIONS from '../actions'
import { SORT_BY } from '../constants'

const SortByFilter = ({ value, selectedValue, onChange }) => (
  <HeaderFilterWithHint selectedValue={selectedValue} hint="Sort by">
    <CheckedMenuList>
      {SORT_BY.map(({ name, query }) => (
        <CheckedMenuItem
          key={query}
          value={query}
          selected={value === query}
          onClick={() => onChange(query)}
        >
          {name}
        </CheckedMenuItem>
      ))}
    </CheckedMenuList>
  </HeaderFilterWithHint>
)

const mapStateToProps = createStructuredSelector({
  selectedValue: filterSortBySelectedValueSelector,
  value: sortByFilterSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    onChange: ACTIONS.changeSorting,
  },
])

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SortByFilter)
