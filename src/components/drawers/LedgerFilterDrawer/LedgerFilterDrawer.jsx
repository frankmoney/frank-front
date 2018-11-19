import React from 'react'
import Drawer from 'components/kit/Drawer'
import Button from 'components/kit/Button'
import {
  DateRangeField,
  AmountField,
  VerificationField,
} from 'components/DrawerFilters'

class LedgerFilterDrawer extends React.Component {
  getAllFilters = () => {
    const { sumLimit, dateLimit, verified } = this.props
    return { sumLimit, dateLimit, verified }
  }

  handleChangeDateRange = value => {
    this.props.onChange({
      ...this.getAllFilters(),
      dateLimit: value,
    })
  }

  handleChangeSum = ({ min, max }) => {
    this.props.onChange({
      ...this.getAllFilters(),
      sumLimit: { min, max },
    })
  }

  handleApply = () => {
    this.props.onApply(this.getAllFilters())
  }

  handleChangeVerification = value => {
    this.props.onChange({
      ...this.getAllFilters(),
      verified: value,
    })
  }

  render() {
    const {
      onApply,
      onReset,
      loaded,
      onChange,
      dateLimit,
      sumLimit,
      verified,
      totalCount,
      totalCountEstimating,
      ...drawerProps
    } = this.props

    const footerText = totalCountEstimating
      ? 'Estimating...'
      : `${totalCount > 0 ? totalCount : 'No'} payments`

    return (
      <Drawer title="Filter payments" {...drawerProps}>
        <Drawer.Content>
          {loaded && (
            <DateRangeField
              label="Date range"
              from={dateLimit.from}
              to={dateLimit.to}
              onChange={this.handleChangeDateRange}
            />
          )}
          {loaded && (
            <AmountField
              from={sumLimit.min}
              to={sumLimit.max}
              onChange={this.handleChangeSum}
            />
          )}
          {loaded && (
            <VerificationField
              value={verified}
              onChange={this.handleChangeVerification}
            />
          )}
        </Drawer.Content>
        <Drawer.Footer text={footerText}>
          <Button width={120} label="Reset" onClick={onReset} />
          <Button
            width={120}
            color="green"
            label="Apply"
            onClick={this.handleApply}
            disabled={totalCountEstimating || !loaded}
          />
        </Drawer.Footer>
      </Drawer>
    )
  }
}
export default LedgerFilterDrawer
