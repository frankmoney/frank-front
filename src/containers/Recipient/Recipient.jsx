import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import { compose, branch, renderComponent, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { injectStyles } from '@frankmoney/ui'
import {
  FixedHeader,
  PageLoader,
  BreadcrumbsItem,
  BreadcrumbsItemLink,
} from '@frankmoney/components'
import Spinner from 'components/kit/Spinner'
import Breadcrumbs from 'components/Breadcrumbs'
import { ROUTES } from 'const'
import { currentAccountIdSelector } from 'redux/selectors/user'
import {
  recipientSelector,
  isLoadingSelector,
  listIsUpdatingSelector,
  paymentCountSelector,
} from './selectors'
import * as ACTIONS from './actions'
import RecipientTable from './RecipientTable'
import RecipientPager from './RecipientPager'
import RecipientCard from './RecipientCard'
import RecipientFilter from './RecipientFilter'
import styles from './Recipient.jss'

class Recipient extends React.PureComponent {
  render() {
    const {
      classes,
      className,
      recipient,
      paymentCount,
      listIsUpdating,
    } = this.props

    return (
      <div className={cx(classes.root, className)}>
        <FixedHeader className={classes.header}>
          <Breadcrumbs>
            <BreadcrumbsItemLink to={ROUTES.directory.root}>
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
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  loading: isLoadingSelector,
  listIsUpdating: listIsUpdatingSelector,
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
  branch(props => props.loading, renderComponent(PageLoader)),
  injectStyles(styles, { grid: true })
)(Recipient)
