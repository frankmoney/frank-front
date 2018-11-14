// @flow
import React from 'react'
import RouterLink from 'components/RouterLink'
import { BigButton } from 'components/kit/Button'
import ListLayoutContentBlock from 'components/ListLayoutContentBlock'
import { ROUTES } from 'const'

const NewButton = () => (
  <ListLayoutContentBlock>
    <RouterLink to={ROUTES.stories.storyNew}>
      <BigButton label="New story" />
    </RouterLink>
  </ListLayoutContentBlock>
)

export default NewButton
