// @flow strict-local
import React from 'react'
import Drawer from 'components/kit/Drawer'
import Button from 'components/kit/Button'
import AreaSpinner from 'components/AreaSpinner'
import {
  DateRangeField,
  AmountField,
  VerificationField,
  PendingField,
  type DateRangeValue,
} from 'components/DrawerFilters'

type SumLimit = {|
  min: number,
  max: number,
|}

type Filters = {|
  date?: DateRangeValue,
  pending?: ?boolean,
  sum?: SumLimit,
  verified?: ?boolean,
|}

type Props = {|
  value: Filters,
  aggregateStartDate: Date,
  aggregateSumMin?: Number,
  aggregateSumMax?: Number,
  //
  disablePendingFilter?: boolean,
  disableVerifiedFilter?: boolean,
  //
  estimating?: boolean,
  loaded: boolean,
  totalCount?: number,
  // callbacks
  onApply: Filters => void,
  onChange: Filters => void,
  onReset: MouseEvent => void,
|}

class PaymentsFilterDrawer extends React.Component<Props> {
  static defaultProps = {
    disablePendingFilter: false,
    disableVerifiedFilter: false,
  }

  mergeValue = (data: Filters) => {
    this.props.onChange({
      ...this.props.value,
      ...data,
    })
  }

  handleChangeDateRange = (value: DateRangeValue) => {
    this.mergeValue({ date: value })
  }

  handleChangeSum = ({ min, max }: SumLimit) => {
    this.mergeValue({
      sum: { min, max },
    })
  }

  handleChangeVerification = (value: ?boolean) => {
    this.mergeValue({
      verified: value,
    })
  }

  handleChangePending = (value: ?boolean) => {
    this.mergeValue({
      pending: value,
    })
  }

  handleApply = () => {
    this.props.onApply(this.props.value)
  }

  render() {
    const {
      onApply,
      onReset,
      onChange,
      loaded,
      value: { date, sum, verified, pending },
      aggregateStartDate,
      aggregateSumMax,
      aggregateSumMin,
      totalCount,
      estimating,
      disablePendingFilter,
      disableVerifiedFilter,
      ...drawerProps
    } = this.props

    const footerText = estimating
      ? 'Estimating...'
      : `${totalCount || 'No'} payments`

    const content = loaded ? (
      <Drawer.Content>
        <DateRangeField
          label="Date range"
          // $FlowFixMe: date is defined at this point
          from={date.from}
          // $FlowFixMe
          to={date.to}
          startDate={aggregateStartDate}
          onChange={this.handleChangeDateRange}
        />
        <AmountField
          min={aggregateSumMin}
          max={aggregateSumMax}
          // $FlowFixMe: sum is defined at this point
          from={sum.min}
          // $FlowFixMe
          to={sum.max}
          onChange={this.handleChangeSum}
        />
        {!disableVerifiedFilter && (
          <VerificationField
            value={verified}
            onChange={this.handleChangeVerification}
          />
        )}
        {!disablePendingFilter && (
          <PendingField value={pending} onChange={this.handleChangePending} />
        )}
      </Drawer.Content>
    ) : (
      <Drawer.Content>
        <AreaSpinner />
      </Drawer.Content>
    )

    return (
      <Drawer title="Filter payments" {...drawerProps}>
        {content}
        <Drawer.Footer text={footerText}>
          <Button width={120} label="Reset" onClick={onReset} />
          <Button
            width={120}
            color="green"
            label="Apply"
            onClick={this.handleApply}
            disabled={estimating || !loaded}
          />
        </Drawer.Footer>
      </Drawer>
    )
  }
}
export default PaymentsFilterDrawer
