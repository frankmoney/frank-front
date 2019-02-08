// @flow strict-local
import React from 'react'
import cx from 'classnames'
import {
  compose,
  withProps,
  branch,
  renderComponent,
  lifecycle,
} from 'recompose'
import { Link } from 'react-router-dom'
import { FixedHeader, BreadcrumbsItem } from '@frankmoney/components'
import { createRouteUrl } from '@frankmoney/utils'
import AreaSpinner from 'components/AreaSpinner'
import Breadcrumbs from 'components/Breadcrumbs'
import CurrencyProvider from 'components/CurrencyProvider'
import SidebarSnack from 'components/SidebarSnackContextProvider/SidebarSnackContextProvider'
import StoryCard from 'components/StoryCard'
import reconnect from 'utils/reconnect'
import { injectStyles } from 'utils/styles'
import { ROUTES } from 'const'
import { BigButton } from 'components/kit/Button'
import ListLayoutContentBlock from 'components/ListLayoutContentBlock/ListLayoutContentBlock'
import TopicCards from 'components/guidies/Cards'
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
        <TopicCards.Stories />
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
              key={story.pid}
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

export default compose(
  reconnect(
    {
      loading: isLoadingSelector,
      noStories: hasNoStoriesSelector,
      stories: storiesSelector,
      deletedSnackShown: deletedSnackShownSelector,
    },
    {
      load: ACTIONS.load,
      leave: ACTIONS.leave,
      hideDeletedSnack: ACTIONS.hideDeletedSnack,
    }
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
