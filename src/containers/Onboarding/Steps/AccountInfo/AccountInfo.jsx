import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import { compose, withState } from 'recompose'
import cx from 'classnames'
import StepLayout from '../../StepLayout'
import StepTitle from '../../StepTitle'
import StepDescription, { Em } from '../../StepDescription'
import TitleTextField from './TitleTextField'
import DescriptionTextField from './DescriptionTextField'

const styles = {
  root: {
    paddingBottom: 125,
  },
  titleField: {
    marginTop: 50,
    width: 775,
  },
  descriptionField: {
    marginTop: 45,
    width: 775,
  },
}

const AccountInfo = ({
  className,
  classes,
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}) => (
  <StepLayout className={cx(classes.root, className)}>
    <StepTitle>Account info</StepTitle>
    <StepDescription>
      This is a public <Em>name</Em> and a <Em>short description</Em> of your
      new Frank account.
      <br />
      It could be named after the project you’re working on or even after
      <br />
      your entire organization if that’s what this is.
    </StepDescription>
    <TitleTextField
      className={classes.titleField}
      placeholder="Account name..."
      value={title}
      onChange={event => onTitleChange(event.target.value)}
    />
    <DescriptionTextField
      className={classes.descriptionField}
      placeholder="Description..."
      value={description}
      onChange={event => onDescriptionChange(event.target.value)}
    />
  </StepLayout>
)

export default compose(
  injectStyles(styles),
  withState('title', 'onTitleChange'),
  withState('description', 'onDescriptionChange')
)(AccountInfo)
