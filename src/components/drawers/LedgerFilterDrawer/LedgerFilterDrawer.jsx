import React from 'react'
import { compose } from 'recompose'
import Drawer from 'components/Drawer'
import Button from 'components/kit/Button'
import {
  DateRangeField,
  AmountField,
  VerificationField,
} from 'components/DrawerFilters'
import { injectStyles } from 'utils/styles'

const styles = theme => ({
  footer: {
    boxShadow: 'none',
  },
  footerText: {
    ...theme.fontMedium(16),
  },
  footerButton: {
    marginLeft: 10,
    width: 120,
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
        </Drawer.Body>
        <Drawer.Footer className={classes.footer}>
          <span className={classes.footerText}>
            {totalCountEstimating
              ? 'Estimating...'
              : `${totalCount > 0 ? totalCount : 'No'} payments`}
          </span>
          <div>
            <Button
              label="Reset"
              onClick={onReset}
              className={classes.footerButton}
            />
            <Button
              color="green"
              label="Apply"
              onClick={this.handleApply}
              disabled={totalCountEstimating || !loaded}
              className={classes.footerButton}
            />
          </div>
        </Drawer.Footer>
      </Drawer>
    )
  }
}
export default compose(injectStyles(styles))(LedgerFilterDrawer)
