import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import Total from './Total'

const styles = {
  root: {
    display: 'flex',
    margin: [3, 0, 22],
  },
}

const Totals = ({ className, classes, income, spending }) => {
  const total = income - spending

  return (
    <div className={cx(classes.root, className)}>
      <Total label="Income" value={income} />
      <Total label="Spending" value={spending} />
      <Total label="Total" value={total} />
    </div>
  )
}

Totals.propTypes = {
  income: PropTypes.number.isRequired,
  spending: PropTypes.number.isRequired,
}

Totals.defaultProps = {
  // FIXME: placeholder
  income: 229620,
  spending: 197568,
}

export default injectStyles(styles)(Totals)
