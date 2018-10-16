import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import Payment, { paymentProps } from './Payment'

const styles = theme => ({
  root: {},
  title: {
    ...theme.fontMedium(18, 26),
    background: '#F8F9F9',
    borderRadius: 8,
    padding: [6, 10, 8],
  },
})

const PaymentBlock = ({
  classes,
  className,
  items,
  paymentClassName,
  showCategories,
  title,
  titleClassName,
}) => (
  <div className={cx(classes.root, className)}>
    <div className={cx(classes.title, titleClassName)}>{title}</div>
    {R.map(
      ({ id, ...payment }) => (
        <Payment
          className={paymentClassName}
          showCategory={showCategories}
          key={id}
          {...payment}
        />
      ),
      items
    )}
  </div>
)

PaymentBlock.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(paymentProps).isRequired,
  showCategories: PropTypes.bool,
  // Styles
  paymentClassName: PropTypes.string,
  titleClassName: PropTypes.string,
}

export default injectStyles(styles)(PaymentBlock)
