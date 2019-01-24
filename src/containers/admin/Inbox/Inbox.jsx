// @flow strict-local
import React from 'react'
import { branch, compose, lifecycle, renderComponent } from 'recompose'
import { FixedHeader, BreadcrumbsItem } from '@frankmoney/components'
import Breadcrumbs from 'components/Breadcrumbs'
import AreaSpinner from 'components/AreaSpinner/AreaSpinner'
import reconnect from 'utils/reconnect'
import { injectStyles } from 'utils/styles'
import MultiEditSnack from 'containers/admin/MultiEditSnack'
import InboxFilter from './InboxFilter'
import InboxList from './InboxList'
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

const ConnectedMultiEditSnack = reconnect({
  categories: SELECTORS.categories,
})(MultiEditSnack)

const Inbox = ({ classes }) => (
  <div className={classes.root}>
    <FixedHeader className={classes.header}>
      <Breadcrumbs>
        <BreadcrumbsItem>Inbox</BreadcrumbsItem>
      </Breadcrumbs>
      <InboxFilter />
    </FixedHeader>
    <div className={classes.container}>
      <InboxList />
    </div>
    <ConnectedMultiEditSnack />
  </div>
)

export default compose(
  reconnect(
    {
      loading: SELECTORS.loading,
      listReloading: SELECTORS.listReloading,
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
