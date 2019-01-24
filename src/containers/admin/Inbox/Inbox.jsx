// @flow strict-local
import React from 'react'
import { branch, compose, lifecycle, renderComponent } from 'recompose'
import { FixedHeader, BreadcrumbsItem } from '@frankmoney/components'
import EmptyAccountPlaceholder from 'components/admin/EmptyAccountPlaceholder'
import Breadcrumbs from 'components/Breadcrumbs'
import AreaSpinner from 'components/AreaSpinner/AreaSpinner'
import reconnect from 'utils/reconnect'
import { injectStyles } from 'utils/styles'
import InboxFilter from './InboxFilter'
import InboxList from './InboxList'
import NoResultsPlaceholder from './NoResultsPlaceholder'
import * as SELECTORS from './selectors'
import ACTIONS from './actions'

const styles = {
  root: {
    minHeight: '100vh',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 110,
    paddingBottom: 100,
  },
  container: {
    width: 850,
  },
  header: {
    justifyContent: 'space-between',
    paddingRight: 30,
  },
}

const Inbox = ({ classes, emptyAccount, noResults }) => {
  const showContent = !(emptyAccount || noResults)
  return (
    <div className={classes.root}>
      <FixedHeader className={classes.header}>
        <Breadcrumbs>
          <BreadcrumbsItem>New</BreadcrumbsItem>
        </Breadcrumbs>
        {showContent && <InboxFilter />}
      </FixedHeader>
      {noResults && <NoResultsPlaceholder />}
      {emptyAccount && <EmptyAccountPlaceholder text="Empty!" />}
      {showContent && (
        <div className={classes.container}>
          <InboxList />
        </div>
      )}
    </div>
  )
}

export default compose(
  reconnect(
    {
      emptyAccount: SELECTORS.emptyAccount,
      listReloading: SELECTORS.listReloading,
      loading: SELECTORS.loading,
      noResults: SELECTORS.noResults,
    },
    {
      load: ACTIONS.load,
      leave: ACTIONS.leave,
    }
  ),
  lifecycle({
    componentWillMount() {
      if (!this.props.loaded) {
        this.props.load({})
      }
    },
    componentWillUnmount() {
      this.props.leave()
    },
  }),
  branch(props => props.loading, renderComponent(AreaSpinner)),
  injectStyles(styles)
)(Inbox)
