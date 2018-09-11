import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'

const styles = {
  root: {},
}

const Payment = ({
  amount,
  category: { color, name },
  classes,
  className,
  description,
  peerName,
  postedOn,
}) => (
  <div className={cx(classes.root, className)}>
    <div>{peerName}</div>
    <div>{amount}</div>
    <div>{postedOn}</div>
    <div style={{ color }}>{name}</div>
    <div>{description}</div>
  </div>
)

Payment.propTypes = {
  amount: PropTypes.number.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string,
  peerName: PropTypes.string.isRequired,
  postedOn: PropTypes.string.isRequired,
}

export default injectStyles(styles)(Payment)
