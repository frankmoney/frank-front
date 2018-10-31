// @flow
import React from 'react'
import * as R from 'ramda'
import DropdownSwitcher from 'components/DropdownSwitcher'

export type Period = string

export type OnChangeCb = Period => void

type Props = {|
  className?: string,
  onChange?: OnChangeCb,
  value: Period,
  values: Array<Period>,
|}

const PeriodSelect = ({ className, onChange, value, values }: Props) => {
  const handlePeriodChange = onChange && (event => onChange(event.target.value))
  const keyedValues = R.map(R.objOf('key'))(values)
  return (
    <DropdownSwitcher
      className={className}
      onChange={handlePeriodChange}
      value={value}
      values={keyedValues}
    />
  )
}

export default PeriodSelect
