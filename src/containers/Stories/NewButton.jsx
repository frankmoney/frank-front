// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { BigButton } from 'components/kit/Button'
import ListLayoutContentBlock from 'components/ListLayoutContentBlock'
import { ROUTES } from 'const'

const NewButton = () => (
  <ListLayoutContentBlock>
    <Link to={ROUTES.stories.storyNew}>
      <BigButton label="New story" />
    </Link>
  </ListLayoutContentBlock>
)

export default NewButton
