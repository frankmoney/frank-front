import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import { compose } from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { injectStyles } from '@frankmoney/ui'
import { paymentsSelector } from '../selectors'
import Payment from './Payment'

const styles = {
  root: {
    overflowY: 'scroll',
  },
}

const Payments = ({ classes, className, data }) => {
  console.log('Payments', data)
  return (
    <div className={cx(classes.root, className)}>
      {R.map(payment => <Payment {...payment} />, data)}
    </div>
  )
}

Payments.propTypes = {}

const mapStateToProps = createStructuredSelector({
  data: paymentsSelector,
})

export default compose(
  connect(mapStateToProps),
  injectStyles(styles)
)(Payments)
