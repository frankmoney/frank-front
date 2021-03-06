// @flow
import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import { compose, branch, renderComponent, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import {
  FixedHeader,
  BreadcrumbsItem,
  BreadcrumbsItemLink,
} from '@frankmoney/components'
import { createRouteUrl } from '@frankmoney/utils'
import AreaSpinner from 'components/AreaSpinner'
import Breadcrumbs from 'components/Breadcrumbs'
import CurrencyProvider from 'components/CurrencyProvider'
import Spinner from 'components/kit/Spinner'
import MultiEditSnack from 'containers/admin/MultiEditSnack'
import reconnect from 'utils/reconnect'
import { injectStyles } from 'utils/styles'
import { ROUTES } from 'const'
import { currentAccountIdSelector } from 'redux/selectors/user'
import {
  currencyCodeSelector,
  recipientSelector,
  isLoadingSelector,
  listIsUpdatingSelector,
  paymentCountSelector,
  categoriesSelector,
} from './selectors'
import * as ACTIONS from './actions'
import RecipientTable from './RecipientTable'
import RecipientPager from './RecipientPager'
import RecipientCard from './RecipientCard'
import RecipientFilter from './RecipientFilter'
import styles from './Recipient.jss'

const ConnectedMultiEditSnack = reconnect({
  categories: categoriesSelector,
})(MultiEditSnack)

class Recipient extends React.PureComponent {
  render() {
    const {
      classes,
      className,
      currencyCode,
      recipient,
      paymentCount,
      listIsUpdating,
      accountId,
    } = this.props

    return (
      <CurrencyProvider code={currencyCode}>
        <div className={cx(classes.root, className)}>
          <FixedHeader className={classes.header}>
            <Breadcrumbs>
              <BreadcrumbsItemLink
                to={createRouteUrl(ROUTES.account.directory.root, { accountId })}
              >
                Directory
              </BreadcrumbsItemLink>
              <BreadcrumbsItem>{recipient.name}</BreadcrumbsItem>
            </Breadcrumbs>
            <RecipientFilter />
          </FixedHeader>
          <div className={classes.container}>
            <RecipientCard
              className={classes.recipientCard}
              {...recipient}
              paymentCount={paymentCount}
            />

            {listIsUpdating && (
              <div className={classes.listLoaderWrap}>
                <Spinner className={classes.loader} size={45} />
              </div>
            )}
            {!listIsUpdating && <RecipientTable />}
            {!listIsUpdating && (
              <div className={classes.tablePagerWrap}>
                <RecipientPager className={classes.tablePager} />
              </div>
            )}
          </div>
          <ConnectedMultiEditSnack />
        </div>
      </CurrencyProvider>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  loading: isLoadingSelector,
  listIsUpdating: listIsUpdatingSelector,
  currencyCode: currencyCodeSelector,
  recipient: recipientSelector,
  paymentCount: paymentCountSelector,
  accountId: currentAccountIdSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    load: ACTIONS.load,
    leave: ACTIONS.leave,
  },
])

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentWillMount() {
      if (!this.props.loaded) {
        this.props.load({
          accountId: this.props.accountId,
          peerId: this.props.peerId,
        })
      }
    },
    componentWillUnmount() {
      this.props.leave()
    },
  }),
  branch(props => props.loading, renderComponent(AreaSpinner)),
  injectStyles(styles, { grid: true })
)(Recipient)
