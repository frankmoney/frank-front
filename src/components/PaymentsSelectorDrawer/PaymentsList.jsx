// @flow strict-local
import * as React from 'react'
import CurrencyProvider from 'components/CurrencyProvider'
import { PaymentListRow, ROW_HEIGHT } from 'components/PaymentListRow'
import PaymentListRowMore from 'components/PaymentListRowMore'
import List from './ListVirtualized'

type Id = string
type Payment = { id: String }

type Props = {
  payments: Array<Payment>,
  selectedIds: Array<Id>,
  canRequestMore?: boolean,
  inset?: number,
  isLoadingMore?: boolean,
  moreButtonLabel: string,
  onRequestMore?: () => void,
  onSelectionChange: (Array<Id>) => void,
}

// Нам необходим контекст чтобы передать изменение некоторых пропов внутрь айтем компонент листа,
// т.к. лист не реагирует ни на какие апдейты кроме списка айтемов и их количества
// можно было бы вручную форсить апдейт листа, но нам нужно лишь передать лоадинг в последний айтем, контекст должен отработать быстрее
const LoadingContext = React.createContext(false)

class PaymentsList extends React.Component<Props> {
  static defaultProps = {
    payments: [],
    selectedIds: [],
    canRequestMore: false,
    isLoadingMore: false,
    moreButtonLabel: 'Show more payments',
  }

  componentDidUpdate(prevProps: Props) {
    // Есть проблема что лист не реагирует на изменение пропов айтемов, и нужно
    // либо конектить каждый из них к редаксу напрямую через локальный селектор по id
    // либо просто тупо говорить листу перерисоваться при каждом чеке
    // (выбран последний грубый вариант, вроде работает быстро, если будет тормозить - переписать на редакс)
    if (this.props.selectedIds !== prevProps.selectedIds) {
      this.list.forceUpdateGrid()
    }
  }

  getInsetStyles = style =>
    this.props.inset
      ? {
          padding: `0 ${this.props.inset}px`,
          ...style,
        }
      : style

  handleListRef = ref => {
    this.list = ref
  }

  renderRowMore = ({ style, ...itemProps }) => (
    <LoadingContext.Consumer>
      {loading => (
        <PaymentListRowMore
          loading={loading}
          label={this.props.moreButtonLabel}
          onClick={this.props.onRequestMore}
          style={this.getInsetStyles(style)}
          {...itemProps}
        />
      )}
    </LoadingContext.Consumer>
  )

  renderRowPayment = (payment, { style, ...itemProps }) => {
    const { payments, selectedIds, onSelectionChange } = this.props
    const isLast = payments.indexOf(payment) === payments.length - 1

    const selected = selectedIds.includes(payment.id)

    // FIXME list reconcilation every check?
    const onToggle = newSelected => {
      onSelectionChange(
        !newSelected
          ? this.props.selectedIds.filter(x => x !== payment.id)
          : [...this.props.selectedIds, payment.id]
      )
    }

    const computedStyle = this.getInsetStyles(style)

    return (
      <PaymentListRow
        noSeparator={isLast}
        selectable
        selected={selected}
        onToggle={onToggle}
        {...payment}
        style={computedStyle}
        {...itemProps}
      />
    )
  }

  renderItem = ({ index, ...itemProps }) => {
    const { payments, canRequestMore } = this.props

    if (index < payments.length) {
      return this.renderRowPayment(payments[index], itemProps)
    } else if (canRequestMore && index === payments.length) {
      return this.renderRowMore(itemProps)
    }
    return null
  }

  render() {
    const { canRequestMore, payments, className, isLoadingMore } = this.props

    const itemsCount = payments.length + Number(!!canRequestMore)

    return (
      <CurrencyProvider code="USD">
        <LoadingContext.Provider value={isLoadingMore}>
          <List
            ref={this.handleListRef}
            className={className}
            itemComponent={this.renderItem}
            itemHeight={ROW_HEIGHT}
            itemCount={itemsCount}
          />
        </LoadingContext.Provider>
      </CurrencyProvider>
    )
  }
}

export default PaymentsList
