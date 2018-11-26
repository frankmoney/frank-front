import React from 'react'
import { branch, compose, lifecycle, renderComponent } from 'recompose'
import { FixedHeader, BreadcrumbsItem } from '@frankmoney/components'
import { injectStyles } from 'utils/styles'
import reconnect from 'utils/reconnect'
import Breadcrumbs from 'components/Breadcrumbs'
import AreaSpinner from 'components/AreaSpinner/AreaSpinner'
import TableEmptyPlaceholder from 'components/TableEmptyPlaceholder'
import InboxFilter from './InboxFilter'
import InboxList from './InboxList'
import InboxPager from './InboxPager'
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

const Inbox = ({ classes, noResults, listReloading }) => (
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
