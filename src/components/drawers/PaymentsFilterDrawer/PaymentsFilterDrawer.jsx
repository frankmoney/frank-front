// @flow
import React from 'react'
import Drawer from 'components/kit/Drawer'
import Button from 'components/kit/Button'
import AreaSpinner from 'components/AreaSpinner'
import {
  DateRangeField,
  AmountField,
  VerificationField,
  PendingField,
} from 'components/DrawerFilters'

type DateString = Date | string

type SumLimit = {|
  min: number,
  max: number,
|}

type DateLimit = {|
  from: DateString,
  to: DateString,
|}

type Props = {|
  // filters data
  sumLimit?: SumLimit,
  dateLimit?: DateLimit,
  verified: boolean,
  pending: boolean,
  //
  disablePendingFilter?: boolean,
  disableVerifiedFilter?: boolean,
  //
  loaded: boolean,
  estimating?: boolean,
  totalCount?: number,
  // callbacks
  onReset: Function,
  onChange: Function,
  onApply: Function,
|}

class PaymentsFilterDrawer extends React.Component<Props> {
  static defaultProps = {
    disablePendingFilter: false,
    disableVerifiedFilter: false,
  }

  get allFilters() {
    const { sumLimit, dateLimit, verified, pending } = this.props
    return { sumLimit, dateLimit, verified, pending }
  }

  mergeFilters = data => {
    this.props.onChange({
      ...this.allFilters,
      ...data,
    })
  }

  handleChangeDateRange = value => {
    this.mergeFilters({ dateLimit: value })
  }

  handleChangeSum = ({ min, max }) => {
    this.mergeFilters({
      sumLimit: { min, max },
    })
  }

  handleChangeVerification = value => {
    this.mergeFilters({
      verified: value,
    })
  }

  handleChangePending = value => {
    this.mergeFilters({
      pending: value,
    })
  }

  handleApply = () => {
    this.props.onApply(this.allFilters)
  }

  render() {
    const {
      onApply,
      onReset,
      onChange,
      loaded,
      dateLimit,
      sumLimit,
      verified,
      pending,
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
          // $FlowFixMe: dateLimit is defined at this point
          from={dateLimit.from}
          // $FlowFixMe
          to={dateLimit.to}
          onChange={this.handleChangeDateRange}
        />
        <AmountField
          // $FlowFixMe: sumLimit is defined at this point
          from={sumLimit.min}
          // $FlowFixMe
          to={sumLimit.max}
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
