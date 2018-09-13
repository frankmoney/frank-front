import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import PropTypes from 'prop-types'
import D from 'date-fns/fp'
import { compose } from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { injectStyles } from '@frankmoney/ui'
import CurrencyProvider from 'components/CurrencyProvider'
import { paymentsSelector } from '../selectors'
import PaymentBlock from './PaymentBlock'
import { paymentProps } from './Payment'

const SCROLL_PADDING = 13

const styles = {
  root: {
    overflowY: 'scroll',
    margin: [-5, 18 - SCROLL_PADDING, 0, 18],
    paddingRight: SCROLL_PADDING,
  },
}

const dateProp = R.prop('postedOn')
const fullMonth = R.pipe(
  dateProp,
  D.format('MMMM')
)
const groupPayments = R.pipe(
  R.groupBy(fullMonth),
  R.toPairs,
  R.addIndex(R.map)(([title, items], key) => ({
    items: R.sortBy(dateProp, items),
    key,
    title,
  }))
)

const Payments = ({ classes, className, data }) => {
  const groups = groupPayments(data)

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
