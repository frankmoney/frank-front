// @flow
import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import D from 'date-fns/fp'
import { compose } from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import CurrencyProvider from 'components/CurrencyProvider'
import {
  paymentsSelector,
  showCategoriesSelector,
} from 'containers/Widget/selectors'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import PaymentBlock from './PaymentBlock'
import type { PaymentProps } from './Payment.flow'

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

type Props = {|
  ...InjectStylesProps,
  //
  data: Array<PaymentProps>,
  showCategories: boolean,
  // Styles
  blockClassName: ?string,
  blockTitleClassName: ?string,
  paymentClassName: ?string,
|}

const Payments = ({
  blockClassName,
  blockTitleClassName,
  classes,
  className,
  data,
  paymentClassName,
  showCategories,
}: Props) => {
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

const mapStateToProps = createStructuredSelector({
  data: paymentsSelector,
  showCategories: showCategoriesSelector,
})

export default compose(
  connect(mapStateToProps),
  injectStyles(styles)
)(Payments)
