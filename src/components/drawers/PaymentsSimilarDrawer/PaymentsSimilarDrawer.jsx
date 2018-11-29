// @flow strict-local
import React from 'react'
import PaymentsList from 'components/common/PaymentsList'
import Drawer from 'components/kit/Drawer'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import AreaSpinner from 'components/AreaSpinner'
import { DRAWER_INSET } from 'components/kit/Drawer/styles'
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

export type RouteType = 'admin' | 'public'

type Payment = Object // flowlint-line unclear-type:warn

type EmptyCb = () => void

type Props = {|
  ...InjectStylesProps,
  //
  routeType: RouteType,
  loadedPagesCounter: number,
  onClose: EmptyCb,
  onLoadMore?: () => void,
  open?: boolean,
  payments: Array<Payment>,
  paymentsCount: number,
  paymentsDateRange: DateRange,
  totalPagesCounter: number,
  // список полностью перезагружается
  isLoading: boolean,
  // список загружает айтемы в конец
  isLoadingMore: boolean,
|}

type State = {|
  selectedPayments: Array<Payment>,
|}

class PaymentsSimilarDrawer extends React.PureComponent<Props, State> {
  render() {
    const {
      classes,
      payments,
      paymentsCount,
      paymentsDateRange,
      routeType,
      totalPagesCounter,
      loadedPagesCounter,
      onLoadMore,
      onClose,
      loading,
      loadingMore,
      ...otherProps
    } = this.props

    return (
      <Drawer
        title={
          <div>
            {paymentsCount} similar payments<div className={classes.subtitle}>
              {formatDateRange(...paymentsDateRange, { withDay: true })}
            </div>
          </div>
        }
        onClose={onClose}
        {...otherProps}
      >
        <Drawer.Content disableOverflowTop>
          {loading ? (
            <AreaSpinner size={45} />
          ) : (
            <PaymentsList
              className={classes.list}
              paymentElement={<PaymentSimilarRow routeType={routeType} />}
              paymentHeight={ROW_HEIGHT}
              payments={payments}
              loadingMore={loadingMore}
              canRequestMore={totalPagesCounter > loadedPagesCounter}
              onRequestMore={onLoadMore}
              moreButtonLabel={`Show ${PAGE_SIZE} more payments`}
              inset={DRAWER_INSET}
            />
          )}
        </Drawer.Content>
      </Drawer>
    )
  }
}

PaymentsSimilarDrawer.defaultProps = {
  routeType: 'public',
  paymentsDateRange: ['2016-10-12', '2018-05-14'],
}

export default injectStyles(style)(PaymentsSimilarDrawer)
