import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import { compose } from 'recompose'
import { reduxForm } from 'redux-form/immutable'
import cx from 'classnames'
import { required } from '@frankmoney/forms'
import reconnect from 'utils/reconnect'
import TitleTextField from 'controls/forms/TitleField'
import DescriptionTextField from 'controls/forms/DescriptionField'
import { accountInfoInitialValuesSelector } from '../../selectors'
import StepLayout from '../../ConnectedStepLayout'
import StepTitle from '../../StepTitle'
import StepDescription, { Em } from '../../StepDescription'
import { ACCOUNT_FORM } from '../../constants'

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

const validation = {
  name: [required],
}

const AccountInfo = ({ className, classes }) => (
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
      name="name"
      placeholder="Account name..."
      validate={validation.name}
    />
    <DescriptionTextField
      className={classes.descriptionField}
      placeholder="Description..."
      name="description"
      validate={validation.description}
    />
  </StepLayout>
)

export default compose(
  reconnect({
    initialValues: accountInfoInitialValuesSelector,
  }),
  injectStyles(styles),
  reduxForm({
    form: ACCOUNT_FORM,
  })
)(AccountInfo)
