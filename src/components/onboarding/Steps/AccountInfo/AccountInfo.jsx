import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { reduxForm } from 'redux-form/immutable'
import { required } from '@frankmoney/forms'
import { injectStyles } from 'utils/styles'
import TitleTextField from 'controls/forms/TitleField'
import DescriptionTextField from 'controls/forms/DescriptionField'
import StepTitle from 'components/onboarding/StepTitle'
import StepLayout from 'components/onboarding/StepLayout'
import StepDescription, { Em } from 'components/onboarding/StepDescription'

const styles = theme => ({
  root: {
    paddingBottom: 125,
  },
  titleField: {
    marginTop: 50,
    width: 775,
    color: '#252B43',
  },
  descriptionField: {
    marginTop: 45,
    width: 775,
    color: 'rgba(37, 43, 67, 0.9)',
  },
  bank: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 55,
  },
  bankImage: {
    marginRight: 38,
    height: 38,
    width: 38,
    borderRadius: 5,
  },
  bankName: {
    ...theme.fontMedium(20),
    color: '#252B43',
  },
})

const validation = {
  name: [required],
}

const AccountInfo = ({
  className,
  classes,
  layoutProps,
  bankName,
  bankImageUrl,
}) => (
  <StepLayout
    {...layoutProps}
    className={cx(classes.root, className)}
    backLabel="Select another account"
  >
    <StepTitle>Account info</StepTitle>
    <StepDescription>
      This is a public <Em>name</Em> and a <Em>short description</Em> of your
      new Frank account.
      <br />
      It could be named after the project you’re working on or even after
      <br />
      your entire organization if that’s what this is.
    </StepDescription>
    <div className={classes.content}>
      <div className={classes.bank}>
        <img src={bankImageUrl} alt={bankName} className={classes.bankImage} />
        <div className={classes.bankName}>{bankName}</div>
      </div>
      <TitleTextField
        className={classes.titleField}
        name="name"
        placeholder="Account name..."
        validate={validation.name}
        autoFocus
      />
      <DescriptionTextField
        className={classes.descriptionField}
        placeholder="Description..."
        name="description"
        validate={validation.description}
      />
    </div>
  </StepLayout>
)

export default compose(
  injectStyles(styles),
  reduxForm({})
)(AccountInfo)
