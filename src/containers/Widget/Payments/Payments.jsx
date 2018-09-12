import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import { compose } from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { injectStyles } from '@frankmoney/ui'
import CurrencyProvider from 'components/CurrencyProvider'
import { paymentsSelector } from '../selectors'
import Payment from './Payment'

const styles = {
  root: {
    overflowY: 'scroll',
    margin: [0, 18],
  },
}

const Payments = ({ classes, className, data }) => {
  console.log('Payments', data)
  // TODO: group by month, sort by date
  return (
    <CurrencyProvider code="USD">
      <div className={cx(classes.root, className)}>
        {R.map(
          ({ id, ...payment }) => (
            <Payment showCategory key={id} {...payment} />
          ),
          data
        )}
      </div>
    </CurrencyProvider>
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
