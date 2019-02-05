// @flow strict-local
import React from 'react'
import DropdownSwitcher from 'components/DropdownSwitcher'

export type Period = string

export type OnPeriodChangeCb = Period => void

export type PeriodSelectProps = {|
  onPeriodChange: OnPeriodChangeCb,
  period: Period,
  periods: Array<Period>,
|}

type Props = {|
  ...PeriodSelectProps,
  className?: string,
|}

const PeriodSelect = ({
  className,
  onPeriodChange,
  period,
  periods,
}: Props) => {
  const handlePeriodChange = event => onPeriodChange(event.target.value)
  const keyedValues = [{ key: 'All time' }]
  const value = 'All time' // FIXME
  return (
    <DropdownSwitcher // TODO: rewrite using kit
      className={className}
      onChange={handlePeriodChange}
      value={value}
      values={keyedValues}
    />
  )
}

export default PeriodSelect
