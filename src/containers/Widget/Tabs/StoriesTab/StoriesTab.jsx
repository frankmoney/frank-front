import React from 'react'
import StoryItem from './StoryItem'
import type { Props } from './StoriesTab.flow'

const StoriesTab = ({ data: stories, className, storyClassNames }: Props) => (
  <div className={className}>
    {stories.map(story => (
      <StoryItem data={story} classNames={storyClassNames} />
    ))}
  </div>
)

export default StoriesTab
