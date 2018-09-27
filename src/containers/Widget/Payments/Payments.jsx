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
import { paymentsSelector, showCategoriesSelector } from '../selectors'
import PaymentBlock from './PaymentBlock'
import { paymentProps } from './Payment'

const styles = {
  root: {},
}

const dateProp = R.prop('postedOn')
const fullMonthProp = R.pipe(
  dateProp,
  D.format('MMMM')
)
const groupPayments = R.pipe(
  R.sortBy(dateProp),
  R.groupBy(fullMonthProp),
  R.toPairs,
  R.addIndex(R.map)(([title, items], key) => ({
    items,
    key,
    title,
  }))
)

const Payments = ({
  blockClassName,
  blockTitleClassName,
  classes,
  className,
  data,
  paymentClassName,
  showCategories,
}) => {
  const groups = groupPayments(data)

  return (
    <CurrencyProvider code="USD">
      <div className={cx(classes.root, className)}>
        {R.map(
          group => (
            <PaymentBlock
              className={blockClassName}
              paymentClassName={paymentClassName}
              showCategories={showCategories}
              titleClassName={blockTitleClassName}
              {...group}
            />
          ),
          groups
        )}
      </div>
    </CurrencyProvider>
  )
}

Payments.propTypes = {
  data: PropTypes.arrayOf(paymentProps).isRequired,
  showCategories: PropTypes.bool,
  // Styles
  blockClassName: PropTypes.string,
  blockTitleClassName: PropTypes.string,
  paymentClassName: PropTypes.string,
}

const mapStateToProps = createStructuredSelector({
  data: paymentsSelector,
  showCategories: showCategoriesSelector,
})

export default compose(
  connect(mapStateToProps),
  injectStyles(styles)
)(Payments)
