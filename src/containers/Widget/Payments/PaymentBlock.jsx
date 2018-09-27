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

const PaymentBlock = ({ classes, className, items, showCategories, title }) => (
  <div className={cx(classes.root, className)}>
    <div className={classes.title}>{title}</div>
    {R.map(
      ({ id, ...payment }) => (
        <Payment showCategory={showCategories} key={id} {...payment} />
      ),
      items
    )}
  </div>
)

PaymentBlock.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(paymentProps).isRequired,
  showCategories: PropTypes.bool,
}

export default injectStyles(styles)(PaymentBlock)
