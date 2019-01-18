// @flow strict-local
import React from 'react'
import { required } from '@frankmoney/forms'
import { reduxForm } from 'redux-form/immutable'
import { compose, withPropsOnChange } from 'recompose'
import PopoverDialog from 'components/kit/PopoverDialog'
import TextField from 'components/kit/TextField'
import ReduxFormControl from 'components/kit/ReduxFormControl'
import reconnect from 'utils/reconnect'
import { injectStyles } from 'utils/styles'
import ACTIONS from './actions'
import { teamSelector } from './selectors'

const styles = {}

const validation = {
  name: [required],
}

const ChangeTeamNamePopoverDialog = ({
  classes,
  children,
  dirty,
  valid,
  submitting,
  submit,
  reset,
}) => (
  <PopoverDialog
    width={350}
    place="down"
    confirmLabel="Save"
    confirmButtonProps={{
      disabled: (!dirty || !valid) && !submitting,
      loading: submitting,
    }}
    button={children}
    onConfirm={submit}
    onClose={() => reset()}
  >
    <ReduxFormControl.Field
      className={classes.name}
      name="name"
      validate={validation.name}
      component={TextField}
      stretch
      floatingLabel="Organization name"
    />
  </PopoverDialog>
)

export default compose(
  reconnect({
    team: teamSelector,
  }),
  withPropsOnChange(['team'], ({ team }) => ({
    initialValues: {
      name: team && team.name,
    },
  })),
  reduxForm({
    form: 'change-team-name',
    enableReinitialize: true,
    onSubmit: (values, dispatch) =>
      dispatch(ACTIONS.changeTeamName(values.toJS())),
  }),
  injectStyles(styles)
)(ChangeTeamNamePopoverDialog)
