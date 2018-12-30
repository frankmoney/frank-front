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
import {
  FixedHeader,
  Breadcrumbs,
  BreadcrumbsItem,
} from '@frankmoney/components'
import { createRouteUrl } from '@frankmoney/utils'
import AreaSpinner from 'components/AreaSpinner'
import CurrencyProvider from 'components/CurrencyProvider'
import StoryCard from 'components/StoryCard'
import { injectStyles } from 'utils/styles'
import { ROUTES } from 'const'
import { BigButton } from 'components/kit/Button'
import ListLayoutContentBlock from 'components/ListLayoutContentBlock/ListLayoutContentBlock'
import RouterLink from 'components/RouterLink/RouterLink'
import StoryPublishedDialog from './StoryPublishedDialog'
import {
  isLoadingSelector,
  hasNoStoriesSelector,
  storiesSelector,
} from './selectors'
import * as ACTIONS from './actions'
import styles from './Stories.jss'

const LinkedStoryCard = withProps(({ accountId, storyId }) => ({
  component: Link,
  to: createRouteUrl(ROUTES.account.stories.idRoot, { accountId, storyId }),
}))(StoryCard)

const Stories = ({ classes, accountId, noStories, stories, className }) => (
  <CurrencyProvider code="USD">
    <div className={cx(classes.root, className)}>
      <FixedHeader className={classes.header}>
        <Breadcrumbs>
          <BreadcrumbsItem>Stories</BreadcrumbsItem>
        </Breadcrumbs>
      </FixedHeader>
      <div className={classes.container}>
        <ListLayoutContentBlock>
          <RouterLink
            to={createRouteUrl(ROUTES.account.stories.idRootNew, { accountId })}
          >
            <BigButton label="New story" />
          </RouterLink>
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
  </CurrencyProvider>
)

const mapStateToProps = createStructuredSelector({
  loading: isLoadingSelector,
  noStories: hasNoStoriesSelector,
  stories: storiesSelector,
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
