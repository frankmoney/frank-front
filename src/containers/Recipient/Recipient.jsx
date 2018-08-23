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
  Breadcrumbs,
  BreadcrumbsItem,
  Spinner,
  PageLoader,
} from '@frankmoney/components'
import RecipientCard from 'components/RecipientCard'
import {
  recipientSelector,
  isLoadingSelector,
  listIsUpdatingSelector,
} from './selectors'
import * as ACTIONS from './actions'
import RecipientTable from './RecipientTable'
import RecipientPager from './RecipientPager'
import styles from './Recipient.jss'

class Recipient extends React.PureComponent {
  render() {
    const { classes, className, recipient, listIsUpdating } = this.props

    return (
      <div className={cx(classes.root, className)}>
        <FixedHeader>
          <Breadcrumbs>
            <BreadcrumbsItem>Directory</BreadcrumbsItem>
            <BreadcrumbsItem>{recipient.name}</BreadcrumbsItem>
          </Breadcrumbs>
        </FixedHeader>
        <div className={classes.container}>
          <RecipientCard className={classes.recipientCard} {...recipient} />

          {listIsUpdating && (
            <div className={classes.listLoaderWrap}>
              <Spinner className={classes.loader} />
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
        this.props.load({ peerId: this.props.peerId })
      }
    },
    componentWillUnmount() {
      this.props.leave()
    },
  }),
  branch(props => props.loading, renderComponent(PageLoader)),
  injectStyles(styles, { grid: true })
)(Recipient)
