// @flow strict-local
import React from 'react'
import * as R from 'ramda'
import { Search as IconSearch } from 'material-ui-icons'
import PaymentsList from 'components/common/PaymentsList'
import Drawer from 'components/kit/Drawer'
import Button from 'components/kit/Button'
import type { CurrencyCode } from 'contexts/CurrencyContext'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import { AmountField, DateRangeField } from 'components/DrawerFilters'
import AreaSpinner from 'components/AreaSpinner'
import { PaymentListRow, ROW_HEIGHT } from 'components/PaymentListRow'
import { DRAWER_INSET } from 'components/kit/Drawer/styles'
import TextField from 'components/kit/TextField/TextField'
import CategorySelect from 'components/CategorySelect'
import pluralize from 'utils/pluralize'
import camelize from 'utils/camelize'

const style = theme => ({
  list: {},
  resetFilters: {
    padding: [0, DRAWER_INSET],
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  emptyPlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(37,43,67,0.5)',
    ...theme.fontRegular(22, 28),
  },
})

type Payment = Object // flowlint-line unclear-type:warn
type PaymentId = string
type EmptyCb = () => void
type OnChangeCb = (Array<Payment>) => void

type FilterDate = string | Date
type Filter = { dateMin?: FilterDate, dateMax?: FilterDate }

type Props = {|
  ...InjectStylesProps,
  //
  currencyCode?: CurrencyCode,
  filter: Filter,
  onApply: OnChangeCb,
  onClose: EmptyCb,
  onReset: EmptyCb,
  onFilter?: ({ from: FilterDate, to: FilterDate }) => void,
  onLoadMore?: () => void,
  open?: boolean,
  pageSize: number,
  payments: Array<Payment>,
  initialSelectedPayments: Array<PaymentId>,
  canLoadMore: boolean,
  // список полностью перезагружается
  isLoading: boolean,
  // список загружает айтемы в конец
  isLoadingMore: boolean,
  // список обновляется
  isListUpdating: boolean,
|}

type State = {|
  selectedPayments: Array<PaymentId>,
|}

const renderRow = ({ isLast, ...props }) => (
  <PaymentListRow selectable noSeparator={isLast} {...props} />
)

const getFiltersCount = ({ dateMin, dateMax, sumMin, sumMax, categoryId }) => {
  let count = 0
  if (dateMin || dateMax) {
    count += 1
  }
  if (!R.isNil(sumMin) || !R.isNil(sumMax)) {
    count += 1
  }
  if (categoryId) {
    count += 1
  }
  return count
}

class PaymentsSelectorDrawer extends React.PureComponent<Props, State> {
  static defaultProps = {
    selectedPayments: [],
  }

  state = {
    selectedPayments: this.props.initialSelectedPayments,
    shownFilters: true,
  }

  handleFilterChange = ({ from: dateMin, to: dateMax }) => {
    this.props.onFilter({
      ...this.props.filter,
      dateMin,
      dateMax,
    })
  }

  handleChangeSum = ({ min: sumMin, max: sumMax }) => {
    this.props.onFilter({ ...this.props.filter, sumMin, sumMax })
  }

  handleChangeSearch = ({ target: { value } }) => {
    this.props.onFilter({ ...this.props.filter, search: value })
  }

  handleChangeCategory = categoryId => {
    this.props.onFilter({ ...this.props.filter, categoryId })
  }

  handleAttachClick = () => {
    const { selectedPayments } = this.state
    const { initialSelectedPayments, payments } = this.props

    const attachedPayments = R.difference(
      selectedPayments,
      initialSelectedPayments
    )

    const removedPayments = R.difference(
      initialSelectedPayments,
      selectedPayments
    )

    const newPayments = payments.filter(x => attachedPayments.includes(x.id))

    this.props.onApply({ newPayments, removeIds: removedPayments })
    this.props.onClose()
  }

  handleSelectionChange = ids => {
    this.setState({ selectedPayments: ids })
  }

  handleToggleFilters = () => {
    this.setState(state => ({ shownFilters: !state.shownFilters }))
  }

  componentWillReceiveProps(newProps) {
    if (
      this.props.initialSelectedPayments !== newProps.initialSelectedPayments
    ) {
      this.setState({ selectedPayments: newProps.initialSelectedPayments })
    }
  }

  renderNoPaymentsFound = () => (
    <div className={this.props.classes.emptyPlaceholder}>No payments found</div>
  )

  render() {
    const {
      classes,
      payments,
      categories,
      initialSelectedPayments,
      filter: { dateMin, dateMax, sumMin, sumMax, search, categoryId },
      filterLimits,
      canLoadMore,
      onLoadMore,
      onChange,
      onClose,
      currencyCode,
      isLoadingMore,
      isLoading,
      isListUpdating,
      pageSize,
      onReset,
      ...otherProps
    } = this.props

    const { selectedPayments, shownFilters } = this.state

    const filtersCount = getFiltersCount(this.props.filter)

    let drawerContent
    if (isLoading) {
      drawerContent = (
        <Drawer.Content>
          <AreaSpinner size={45} />
        </Drawer.Content>
      )
    } else {
      drawerContent = (
        <>
          {shownFilters && (
            <DateRangeField
              label="Date range"
              from={dateMin}
              to={dateMax}
              onChange={this.handleFilterChange}
            />
          )}
          {shownFilters && (
            <AmountField
              min={filterLimits.sumMin}
              max={filterLimits.sumMax}
              from={sumMin}
              to={sumMax}
              onChange={this.handleChangeSum}
            />
          )}
          {shownFilters && (
            <Drawer.Field label="Categories">
              <CategorySelect
                categories={categories}
                value={categoryId}
                onChange={this.handleChangeCategory}
                placeholder="All categories"
              />
            </Drawer.Field>
          )}
          {filtersCount > 0 && (
            <div className={classes.resetFilters}>
              <Button
                compactHeight
                color="gray"
                label="Reset filters"
                onClick={() => onReset()}
              />
            </div>
          )}
          <Drawer.Field style={{ marginBottom: 0 }}>
            <TextField
              value={search || ''}
              placeholder="Start typing a recepient..."
              onChange={this.handleChangeSearch}
              stretch
              adornment={<IconSearch />}
            />
          </Drawer.Field>
          <Drawer.Content disableOverflowTop>
            {({ onScroll, scrollRef }) =>
              isListUpdating ? (
                <AreaSpinner size={45} />
              ) : (
                <PaymentsList
                  listRef={scrollRef}
                  onScroll={onScroll}
                  className={classes.list}
                  payments={payments}
                  selectedIds={selectedPayments}
                  currencyCode={currencyCode}
                  onSelectionChange={this.handleSelectionChange}
                  canRequestMore={canLoadMore}
                  onRequestMore={onLoadMore}
                  isLoadingMore={isLoadingMore}
                  moreButtonLabel={`Show ${pageSize} more payments`}
                  inset={DRAWER_INSET}
                  itemHeight={ROW_HEIGHT}
                  renderRow={renderRow}
                  noRowsRenderer={this.renderNoPaymentsFound}
                />
              )
            }
          </Drawer.Content>
        </>
      )
    }

    let footerText = ''
    const attachedPayments = R.difference(
      selectedPayments,
      initialSelectedPayments
    )
    const removedPayments = R.difference(
      initialSelectedPayments,
      selectedPayments
    )

    const hasChangedPayments =
      !!attachedPayments.length || !!removedPayments.length

    if (attachedPayments.length > 0) {
      footerText += `attach ${pluralize('payment', attachedPayments.length)}`
    }

    if (removedPayments.length > 0) {
      if (footerText) {
        footerText += ', '
      }

      footerText += `remove ${pluralize('payment', removedPayments.length)}`
    }

    if (!footerText) {
      footerText = 'No payments'
    }

    return (
      <Drawer
        title="Select payments"
        footerText={camelize(footerText)}
        footerButtonProps={{
          onClick: this.handleAttachClick,
          label: 'Done',
          color: 'blue',
          width: 150,
          disabled: !hasChangedPayments,
        }}
        titleExtraButton={
          <Drawer.Filter
            count={filtersCount}
            on={shownFilters}
            onClick={this.handleToggleFilters}
          />
        }
        onClose={onClose}
        {...otherProps}
      >
        {drawerContent}
      </Drawer>
    )
  }
}

export default injectStyles(style)(PaymentsSelectorDrawer)
