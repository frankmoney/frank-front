import React from 'react'
import { Button } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import { compose } from 'recompose'
import Drawer from 'components/Drawer'
import DateRangeField from './DateRangeField'
import AmountField from './AmountField'
import VerificationField from './VerificationField'

const styles = theme => ({
  footer: {
    boxShadow: 'none',
  },
  footerText: {
    ...theme.fontMedium(16),
  },
  footerButton: {
    marginLeft: 10,
  },
})

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
      classes,
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
    return (
      <Drawer {...drawerProps}>
        <Drawer.Header>
          <Drawer.Title>Filter payments</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          {loaded && (
            <DateRangeField
              value={dateLimit}
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
        </Drawer.Body>
        <Drawer.Footer className={classes.footer}>
          <span className={classes.footerText}>
            {totalCountEstimating
              ? 'Estimating...'
              : `${totalCount > 0 ? totalCount : 'No'} payments`}
          </span>
          <div>
            <Button
              className={classes.footerButton}
              fat
              type="secondary"
              label="Reset"
              onClick={onReset}
            />
            <Button
              className={classes.footerButton}
              fat
              type="primary"
              label="Apply"
              onClick={this.handleApply}
              disabled={totalCountEstimating || !loaded}
            />
          </div>
        </Drawer.Footer>
      </Drawer>
    )
  }
}
export default compose(injectStyles(styles))(LedgerFilterDrawer)
