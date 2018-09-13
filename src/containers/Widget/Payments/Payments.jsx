import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { injectStyles } from '@frankmoney/ui'
import CurrencyProvider from 'components/CurrencyProvider'
import { paymentsSelector } from '../selectors'
import PaymentBlock from './PaymentBlock'
import { paymentProps } from './Payment'

const styles = {
  root: {
    overflowY: 'scroll',
    margin: [-5, 18, 0],
  },
}

const Payments = ({ classes, className, data }) => {
  console.log('Payments', data)
  // TODO: group by month, sort by date
  const groups = [
    {
      title: 'October',
      items: data,
    },
  ]
  return (
    <CurrencyProvider code="USD">
      <div className={cx(classes.root, className)}>
        {R.map(group => <PaymentBlock showCategory {...group} />, groups)}
      </div>
    </CurrencyProvider>
  )
}

Payments.propTypes = {
  data: PropTypes.arrayOf(paymentProps).isRequired,
}

const mapStateToProps = createStructuredSelector({
  data: paymentsSelector,
})

export default compose(
  connect(mapStateToProps),
  injectStyles(styles)
)(Payments)
