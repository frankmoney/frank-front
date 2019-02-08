import React from 'react'
import reconnect from 'utils/reconnect'
import Select from 'components/kit/Select'
import MenuItem from 'components/kit/Menu/MenuItem'
import { sortByFilterSelector } from '../selectors'
import * as ACTIONS from '../actions'
import { SORT_BY } from '../constants'

const formatValue = value => `By ${value}`

const SortByFilter = ({ value, onChange }) => (
  <Select
    align="end"
    value={value}
    dropdownWidth={200}
    formatValue={formatValue}
    onChange={onChange}
    menuProps={{ title: 'Sort by ...' }}
  >
    {SORT_BY.map(({ name, query }) => (
      <MenuItem key={name} value={query} label={name} />
    ))}
  </Select>
)

export default reconnect(
  {
    value: sortByFilterSelector,
  },
  {
    onChange: ACTIONS.changeSorting,
  }
)(SortByFilter)
