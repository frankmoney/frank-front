import React from 'react'
import { Link } from 'react-router-dom'
import { compose, withProps } from 'recompose'
import { createRouteUrl } from '@frankmoney/utils'
import reconnect from 'utils/reconnect'
import { ROUTES } from 'const'
import { accountIdSelector, storiesSelector } from '../selectors'
import StoryCard from './StoryCard'

const LinkedStoryCard = withProps(({ accountId, storyId }) => ({
  component: Link,
  to: createRouteUrl(ROUTES.account.stories.idRoot, { accountId, storyId }),
}))(StoryCard)

const StoriesList = ({ stories, accountId }) => (
  <>
    {stories.map(story => (
      <LinkedStoryCard {...story} accountId={accountId} storyId={story.id} />
    ))}
  </>
)

export default compose(
  reconnect({
    accountId: accountIdSelector,
    stories: storiesSelector,
  })
)(StoriesList)
