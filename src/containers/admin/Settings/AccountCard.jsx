// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { required, maxLength, createValidateFromRules } from '@frankmoney/forms'
import { compose, fromRenderProps } from 'recompose'
import { reduxForm } from 'redux-form-actions/immutable'
import reconnect from 'utils/reconnect'
import { injectStyles } from 'utils/styles'
import Dialog from 'components/kit/Dialog'
import Paper from 'components/kit/Paper'
import TextField from 'components/kit/TextField'
import ReduxFormControl from 'components/kit/ReduxFormControl'
import Button from 'components/kit/Button'
import Switch from 'components/kit/Switch'
import CardTitle from './CardTitle'
import ACTIONS from './actions'
import { accountCardFormValuesSelector, isDemoSelector } from './selectors'

const validation = {
  name: [required, maxLength(40)],
  description: [maxLength(200)],
}

const counters = {
  name: { unit: 'character', max: 40 },
  description: { unit: 'character', max: 200 },
}

const validate = createValidateFromRules(validation)

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: 40,
  },
  title: {
    marginBottom: 34,
  },
  field: {
    marginBottom: 28,
  },
  bottomLine: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: 38,
  },
  switch: {},
  button: {
    width: 130,
  },
}

const AccountCard = ({
  classes,
  className,
  confirmationDialogOpen,
  dirty,
  disabled,
  valid,
  submitting,
  submit,
  toggleConfirmationDialog,
}) => (
  <>
    <Paper type="card" className={cx(classes.root, className)}>
      <CardTitle className={classes.title} text="Account info" />
      <ReduxFormControl.Field
        name="name"
        validate={validation.name}
        counter={counters.name}
        component={TextField}
        className={classes.field}
        floatingLabel="Account name"
        larger
        autoFocus
        disabled={disabled}
      />
      <ReduxFormControl.Field
        name="description"
        validate={validation.description}
        counter={counters.description}
        component={TextField}
        className={classes.field}
        floatingLabel="Description"
        multiLine
        disabled={disabled}
      />
      <div className={classes.bottomLine}>
        <ReduxFormControl.Switch
          name="isPrivate"
          component={Switch}
          className={classes.switch}
          label="Private account"
          disabled={disabled}
        />
        <Button
          className={classes.button}
          label="Save"
          color="green"
          disabled={disabled || (!submitting && (!dirty || !valid))}
          loading={submitting}
          onClick={submit}
        />
      </div>
    </Paper>
    <Dialog open={confirmationDialogOpen}>
      <Dialog.Title>Make your account private?</Dialog.Title>
      <Dialog.Message>
        All publicly shared payments and embedded widgets will become
        unavailable
      </Dialog.Message>
      <Dialog.Buttons>
        <Dialog.Button
          color="gray"
          label="Cancel"
          onClick={() => toggleConfirmationDialog(false)}
        />
        <Dialog.Button
          color="red"
          label="Make account private"
          onClick={submit}
        />
      </Dialog.Buttons>
    </Dialog>
  </>
)

AccountCard.defaultProps = {
  disabled: false,
}

const FORM_NAME = 'admin/settings/account'

export default compose(
  reconnect({
    disabled: isDemoSelector,
    initialValues: accountCardFormValuesSelector,
  }),
  fromRenderProps(Dialog.State, ({ open, toggle }) => ({
    confirmationDialogOpen: open,
    toggleConfirmationDialog: toggle,
  })),
  injectStyles(styles),
  reduxForm({
    form: FORM_NAME,
    enableReinitialize: true,
    validate,
    failedAction: ACTIONS.submitAccountCard.error.toString(),
    succeededAction: ACTIONS.submitAccountCard.success.toString(),
    onSubmit: (
      data,
      dispatch,
      { initialValues, confirmationDialogOpen, toggleConfirmationDialog }
    ) => {
      const { name, description, isPrivate } = data.toJS()

      if (
        isPrivate &&
        !initialValues.get('isPrivate') &&
        !confirmationDialogOpen
      ) {
        toggleConfirmationDialog(true)
        dispatch(ACTIONS.submitAccountCard.error())
      } else {
        toggleConfirmationDialog(false)
        dispatch(
          ACTIONS.submitAccountCard({ name, description, isPublic: !isPrivate })
        )
      }
    },
  })
)(AccountCard)
