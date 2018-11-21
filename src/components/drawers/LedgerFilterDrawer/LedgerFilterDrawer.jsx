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

type DateString = string

type SumLimit = {|
  min: number,
  max: number,
|}

type Props = {|
  // filters data
  sumLimit: SumLimit,
  dateLimit: {
    from: DateString,
    to: DateString,
  },
  verified: boolean,
  //
  loaded: boolean,
  estimating: boolean,
  totalCount: number,
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

  handleChangeDateRange = value => {
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

  handleChangeVerification = value => {
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
      : `${totalCount > 0 ? totalCount : 'No'} payments`

    const content = loaded ? (
      <Drawer.Content>
        <DateRangeField
          label="Date range"
          from={dateLimit.from}
          to={dateLimit.to}
          onChange={this.handleChangeDateRange}
        />
        <AmountField
          from={sumLimit.min}
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
