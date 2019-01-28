// @flow
import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import {
  compose,
  withProps,
  branch,
  renderComponent,
  lifecycle,
} from 'recompose'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { FixedHeader, BreadcrumbsItem } from '@frankmoney/components'
import { createRouteUrl } from '@frankmoney/utils'
import Breadcrumbs from 'components/Breadcrumbs'
import AreaSpinner from 'components/AreaSpinner'
import CurrencyProvider from 'components/CurrencyProvider'
import SidebarSnack from 'components/SidebarSnack/SidebarSnack'
import StoryCard from 'components/StoryCard'
import { injectStyles } from 'utils/styles'
import { ROUTES } from 'const'
import { BigButton } from 'components/kit/Button'
import ListLayoutContentBlock from 'components/ListLayoutContentBlock/ListLayoutContentBlock'
import StoryPublishedDialog from './StoryPublishedDialog'
import {
  isLoadingSelector,
  hasNoStoriesSelector,
  storiesSelector,
  deletedSnackShownSelector,
} from './selectors'
import * as ACTIONS from './actions'
import styles from './Stories.jss'

const LinkedStoryCard = withProps(({ accountId, storyId }) => ({
  component: Link,
  to: createRouteUrl(ROUTES.account.stories.idRoot, { accountId, storyId }),
}))(StoryCard)

const Stories = ({
  classes,
  accountId,
  noStories,
  stories,
  className,
  deletedSnackShown,
  hideDeletedSnack,
}) => (
  <CurrencyProvider code="USD">
    <div className={cx(classes.root, className)}>
      <FixedHeader className={classes.header}>
        <Breadcrumbs>
          <BreadcrumbsItem>Stories</BreadcrumbsItem>
        </Breadcrumbs>
      </FixedHeader>
      <div className={classes.container}>
        <ListLayoutContentBlock>
          <BigButton
            label="New story"
            href={createRouteUrl(ROUTES.account.stories.idRootNew, {
              accountId,
            })}
          />
        </ListLayoutContentBlock>
        {!noStories &&
          stories.map(story => (
            <LinkedStoryCard
              key={story.id}
              accountId={accountId}
              storyId={story.pid}
              title={story.title}
              cover={story.cover}
              text={story.text}
              published={story.published}
              paymentsCount={story.paymentsCount}
              paymentsDateRange={story.paymentsDateRange}
            />
          ))}
      </div>
    </div>
    <StoryPublishedDialog />
    <SidebarSnack
      color="dark"
      shown={deletedSnackShown}
      message="The story was deleted"
      dismissByTimeout={3000}
      onDismiss={hideDeletedSnack}
    />
  </CurrencyProvider>
)

const mapStateToProps = createStructuredSelector({
  loading: isLoadingSelector,
  noStories: hasNoStoriesSelector,
  stories: storiesSelector,
  deletedSnackShown: deletedSnackShownSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    load: ACTIONS.load,
    leave: ACTIONS.leave,
    hideDeletedSnack: ACTIONS.hideDeletedSnack,
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
        this.props.load()
      }
    },
    componentWillUnmount() {
      this.props.leave()
    },
  }),
  branch(props => props.loading, renderComponent(AreaSpinner)),
  injectStyles(styles)
)(Stories)
