import React from 'react'
import {
  FixedHeader,
  Breadcrumbs,
  BreadcrumbsItem,
} from '@frankmoney/components'
import ListLayoutContent from 'components/ListLayoutContent'
import StoryCard from 'components/StoryCard'
import DEMO from './data.json'
import NewButton from './NewButton'

const Stories = () => (
  <>
    <FixedHeader>
      <Breadcrumbs>
        <BreadcrumbsItem>Stories</BreadcrumbsItem>
      </Breadcrumbs>
    </FixedHeader>
    <ListLayoutContent>
      <NewButton />
      <StoryCard {...DEMO.stories[0]} />
      <StoryCard {...DEMO.stories[1]} />
      <StoryCard {...DEMO.stories[2]} />
      <StoryCard {...DEMO.stories[3]} />
    </ListLayoutContent>
  </>
)

export default Stories
