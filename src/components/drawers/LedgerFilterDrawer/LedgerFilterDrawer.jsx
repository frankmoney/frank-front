// @flow
import React from 'react'
import Drawer from 'components/kit/Drawer'
import Button from 'components/kit/Button'
import AreaSpinner from 'components/AreaSpinner'
import {
  DateRangeField,
  AmountField,
  VerificationField,
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
  verified?: boolean,
  //
  loaded: boolean,
  estimating?: boolean,
  totalCount?: number,
  // callbacks
  onReset: Function,
  onChange: Function,
  onApply: Function,
|}

class LedgerFilterDrawer extends React.Component<Props> {
  // flowlint-next-line unsafe-getters-setters:off
  get allFilters() {
    const { sumLimit, dateLimit, verified } = this.props
    return { sumLimit, dateLimit, verified }
  }

  handleChangeDateRange = (value: DateLimit) => {
    this.props.onChange({
      ...this.allFilters,
      dateLimit: value,
    })
  }

  handleChangeSum = ({ min, max }: SumLimit) => {
    this.props.onChange({
      ...this.allFilters,
      sumLimit: { min, max },
    })
  }

  handleApply = () => {
    this.props.onApply(this.allFilters)
  }

  handleChangeVerification = (value: ?boolean) => {
    this.props.onChange({
      ...this.allFilters,
      verified: value,
    })
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
      totalCount,
      estimating,
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
        <VerificationField
          value={verified}
          onChange={this.handleChangeVerification}
        />
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
export default LedgerFilterDrawer
