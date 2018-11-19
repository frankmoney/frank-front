// @flow strict-local
import React from 'react'
import Drawer from 'components/kit/Drawer'
import type { CurrencyCode } from 'contexts/CurrencyContext'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import { DateRangeField } from 'components/DrawerFilters'
import AreaSpinner from 'components/AreaSpinner'
import { PAGE_SIZE } from '../../containers/admin/StoryEdit/constants'
import { DRAWER_INSET } from '../kit/Drawer/styles'
import PaymentsList from './PaymentsList'

const style = theme => ({
  modeTitle: {},
  modeCategory: {},
  header: {
    marginBottom: 20,
  },
  title: {
    ...theme.fontMedium(40, 46),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  filter: {
    height: 58,
    backgroundColor: 'gray',
  },
  listContainer: {
    flex: 1,
    marginRight: -30,
    marginBottom: 10,
  },
  list: {
    paddingBottom: 30,
  },
  footer: {
    color: '#252B43',
    ...theme.fontMedium(16, 26),
  },
  attachPaymentsButton: {
    width: 150,
  },
})

type Payment = Object // flowlint-line unclear-type:warn

type EmptyCb = () => void
type OnChangeCb = (Array<Payment>) => void

type FilterDate = string | Date
type Filter = { dateMin?: FilterDate, dateMax?: FilterDate }

type Props = {|
  ...InjectStylesProps,
  //
  currencyCode?: CurrencyCode,
  filter: Filter,
  loadedPagesCounter: number,
  onChange: OnChangeCb,
  onClose: EmptyCb,
  onFilter?: ({ from: FilterDate, to: FilterDate }) => void,
  onLoadMore?: () => void,
  open?: boolean,
  payments: Array<Payment>,
  selectedPayments: Array<Payment>,
  totalPagesCounter: number,
  // список полностью перезагружается
  isLoading: boolean,
  // список загружает айтемы в конец
  isLoadingMore: boolean,
|}

type State = {|
  selectedPayments: Array<Payment>,
|}

class PaymentsSelectorDrawer extends React.PureComponent<Props, State> {
  state = {
    selectedPayments: this.props.selectedPayments,
  }

  handleFilterChange = ({ from, to }) => {
    if (typeof this.props.onFilter === 'function') {
      this.props.onFilter({ from, to })
    }
  }

  handleAttachClick = () => {
    this.props.onChange(this.state.selectedPayments)
    this.props.onClose()
  }

  handleSelectionChange = ids => {
    this.setState({ selectedPayments: ids })
  }

  render() {
    const {
      classes,
      payments,
      selectedPayments: selectedPaymentsProp,
      filter: { dateMin: from, dateMax: to },
      totalPagesCounter,
      loadedPagesCounter,
      onLoadMore,
      onChange,
      onClose,
      currencyCode,
      isLoadingMore,
      isLoading,
      ...otherProps
    } = this.props

    const { selectedPayments } = this.state

    return (
      <Drawer
        title="Select payments"
        footerText={`${selectedPayments.length} payments`}
        footerButtonProps={{
          onClick: this.handleAttachClick,
          label: 'Attach',
          width: 150,
        }}
        onClose={onClose}
        {...otherProps}
      >
        <DateRangeField
          from={from}
          to={to}
          onChange={this.handleFilterChange}
          style={{ marginBottom: 0 }}
        />
        <Drawer.Content disableOverflowTop>
          {isLoading ? (
            <AreaSpinner size={45} />
          ) : (
            <PaymentsList
              className={classes.list}
              payments={payments}
              selectedIds={selectedPayments}
              currencyCode={currencyCode}
              onSelectionChange={this.handleSelectionChange}
              canRequestMore={totalPagesCounter > loadedPagesCounter}
              onRequestMore={onLoadMore}
              isLoadingMore={isLoadingMore}
              moreButtonLabel={`Show ${PAGE_SIZE} more payments`}
              inset={DRAWER_INSET}
            />
          )}
        </Drawer.Content>
      </Drawer>
    )
  }
}

export default injectStyles(style)(PaymentsSelectorDrawer)
