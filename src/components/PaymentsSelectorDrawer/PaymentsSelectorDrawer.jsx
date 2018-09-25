import React from 'react'
import * as R from 'ramda'
import { createSelector } from 'reselect'
import { Button } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import CurrencyProvider from 'components/CurrencyProvider'
import Drawer from 'components/Drawer'
import List from 'components/ListVirtualized'
import { PaymentListRow, ROW_HEIGHT } from 'components/PaymentListRow'

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
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
  footer: {
    color: '#252B43',
    ...theme.fontMedium(16, 26),
  },
})

const getId = R.prop('id')

class PaymentsSelectorDrawer extends React.PureComponent {
  state = {
    selectedPayments: [],
  }

  componentWillMount() {
    this.setState({
      selectedPayments: this.props.selectedPayments,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.open) {
      this.setState({
        selectedPayments: nextProps.selectedPayments,
      })
    }
  }

  handleSelectPayment = payment => {
    const selectedIds = this.selectedPaymentsIdsSelector(this.state)
    this.setState({
      selectedPayments:
        selectedIds.indexOf(payment.id) !== -1
          ? R.without([payment], this.state.selectedPayments)
          : R.concat([payment], this.state.selectedPayments),
    })
  }

  handleAttachClick = () => {
    this.props.onChange(this.state.selectedPayments)
    this.props.onClose()
  }

  selectedPaymentsIdsSelector = createSelector(
    R.prop('selectedPayments'),
    R.map(getId)
  )

  renderItemComponent = ({ index, ...otherProps }) => (
    <PaymentListRow
      lastItem={index === this.props.payments.length - 1}
      loadMore={this.props.totalPagesCounter > this.props.loadedPagesCounter}
      selectable
      selected={R.contains(
        getId(this.props.payments[index]),
        this.selectedPaymentsIdsSelector(this.state)
      )}
      onToggle={() => this.handleSelectPayment(this.props.payments[index])}
      onLoadMore={this.props.onLoadMore}
      {...this.props.payments[index]}
      {...otherProps}
    />
  )

  render() {
    const {
      classes,
      payments,
      totalPagesCounter,
      loadedPagesCounter,
      onLoadMore,
      currencyCode = 'USD',
      onChange,
      ...otherProps
    } = this.props

    const { selectedPayments } = this.state

    return (
      <Drawer onClose={this.handleClose} {...otherProps}>
        <Drawer.Header
          className={classes.header}
          buttons={<Drawer.CloseButton />}
        >
          <Drawer.Title className={classes.title}>Select payments</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className={classes.container}>
          <div className={classes.filter} />
          <div className={classes.listContainer}>
            <CurrencyProvider code={currencyCode}>
              <List
                itemComponent={this.renderItemComponent}
                itemHeight={ROW_HEIGHT}
                itemCount={payments.length + 1}
                className={classes.list}
              />
            </CurrencyProvider>
          </div>
        </Drawer.Body>
        <Drawer.Footer className={classes.footer}>
          {selectedPayments.length} payments
          <Button
            fat
            type="primary"
            label="Attach"
            onClick={this.handleAttachClick}
          />
        </Drawer.Footer>
      </Drawer>
    )
  }
}

export default injectStyles(style)(PaymentsSelectorDrawer)
