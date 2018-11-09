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
import { injectStyles } from '@frankmoney/ui'
import {
  FixedHeader,
  Breadcrumbs,
  BreadcrumbsItem,
  PageLoader,
} from '@frankmoney/components'
import { createRouteUrl } from '@frankmoney/utils'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import CurrencyProvider from 'components/CurrencyProvider'
import StoryCard from 'components/StoryCard'
import { ROUTES } from 'const'
import NewButton from './NewButton'
import ShareDialog from './ShareDialog'
import {
  isLoadingSelector,
  hasNoStoriesSelector,
  storiesSelector,
} from './selectors'
import * as ACTIONS from './actions'
import styles from './Stories.jss'

const LinkedStoryCard = withProps(({ pid }) => ({
  component: Link,
  to: createRouteUrl(ROUTES.manage.stories.storyPreview, { id: pid }),
}))(StoryCard)

const Stories = ({ classes, noStories, stories, className }) => (
  <CurrencyProvider code="USD">
    <div className={cx(classes.root, className)}>
      <FixedHeader className={classes.header}>
        <Breadcrumbs>
          <BreadcrumbsItem>Stories</BreadcrumbsItem>
        </Breadcrumbs>
      </FixedHeader>
      <div className={classes.container}>
        <NewButton />
        {!noStories &&
          stories.map(story => (
            <LinkedStoryCard {...story.draft} pid={story.pid} />
          ))}
      </div>
    </div>
    <ShareDialog />
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
  branch(props => props.loading, renderComponent(PageLoader)),
  injectStyles(styles, { grid: true })
)(Stories)
