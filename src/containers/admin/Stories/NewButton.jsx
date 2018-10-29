import React from 'react'
import { GiantButton } from '@frankmoney/components'
import AddIcon from 'material-ui-icons/Add'
import ListLayoutContentBlock from 'components/ListLayoutContentBlock'
import { ROUTES } from 'const'

const NewButton = () => (
  <ListLayoutContentBlock>
    <GiantButton
      label="New story"
      icon={AddIcon}
      href={ROUTES.manage.stories.storyNew}
    />
  </ListLayoutContentBlock>
)

export default NewButton
