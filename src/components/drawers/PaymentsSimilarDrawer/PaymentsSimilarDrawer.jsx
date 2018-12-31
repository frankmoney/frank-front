// @flow strict-local
import React from 'react'
import PaymentsList from 'components/common/PaymentsList'
import Drawer from 'components/kit/Drawer'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import AreaSpinner from 'components/AreaSpinner'
import { DRAWER_INSET } from 'components/kit/Drawer/styles'
import { type Payment, type PaymentId } from 'data/models/payment'
import { formatDateRange, type DateRange } from 'utils/dates'
import {
  DEFAULT_DRAWER_PAYMENTS_PAGE_SIZE as PAGE_SIZE,
  DEFAULT_DRAWER_ROW_HEIGHT as ROW_HEIGHT,
} from '../constants'
import PaymentSimilarRow from './PaymentSimilarRow'

const style = theme => ({
  list: {
    paddingBottom: 30,
  },
  subtitle: {
    marginTop: 10,
    opacity: 0.7,
    ...theme.fontRegular(18, 26),
  },
})

type Props = {|
  ...InjectStylesProps,
  //
  loadedPagesCounter: number,
  loading?: boolean, // список полностью перезагружается
  loadingMore?: boolean, // список загружает айтемы в конец
  onClose: () => void,
  onLoadMore?: ({ paymentId: PaymentId }) => void,
  open?: boolean,
  paymentId: PaymentId,
  payments: Array<Payment>,
  paymentsCount: number,
  paymentsDateRange: DateRange,
  totalPagesCounter: number,
|}

type State = {|
  selectedPayments: Array<Payment>,
|}

class PaymentsSimilarDrawer extends React.PureComponent<Props, State> {
  static defaultProps = {
    paymentsDateRange: ['2016-10-12', '2018-05-14'],
  }

  renderRow = ({ isLast, onToggle, ...rowProps }) => (
    <PaymentSimilarRow {...rowProps} />
  )

  render() {
    const {
      classes,
      payments,
      paymentsCount,
      paymentsDateRange,
      totalPagesCounter,
      loadedPagesCounter,
      onLoadMore,
      onClose,
      loading,
      loadingMore,
      paymentId,
      ...otherProps
    } = this.props

    const title = `${paymentsCount} similar payments`
    const subtitle = formatDateRange(...paymentsDateRange, { withDay: true })

    return (
      <Drawer
        title={title}
        subtitle={subtitle}
        onClose={onClose}
        {...otherProps}
      >
        <Drawer.Content>
          {loading ? (
            <AreaSpinner size={45} />
          ) : (
            <PaymentsList
              className={classes.list}
              renderRow={this.renderRow}
              itemHeight={ROW_HEIGHT}
              payments={payments}
              isLoadingMore={loadingMore}
              canRequestMore={totalPagesCounter > loadedPagesCounter}
              onRequestMore={
                onLoadMore ? () => onLoadMore({ paymentId }) : undefined
              }
              moreButtonLabel={`Show ${PAGE_SIZE} more payments`}
              inset={DRAWER_INSET}
            />
          )}
        </Drawer.Content>
      </Drawer>
    )
  }
}

export default injectStyles(style)(PaymentsSimilarDrawer)
