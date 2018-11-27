import React from 'react'
import { reduxForm } from 'redux-form/immutable'
import { compose } from 'recompose'
import Dialog from 'components/kit/Dialog'
import ReduxFormControl from 'components/kit/ReduxFormControl'
import TextField from 'components/kit/TextField'

const required = value => !value && 'Required'
const maxLength50 = value =>
  value && value.length > 50 && `${50 - value.length} symbols left`

const surnameCounter = { unit: 'character', max: 50 }

const BasicForm = ({ classes, submit, invalid }) => (
  <Dialog.Paper>
    <Dialog.Title>Form</Dialog.Title>
    <ReduxFormControl.Field
      name="name"
      label="Name"
      stretch
      placeholder="Frank"
      validate={required}
      component={TextField}
      style={{ marginBottom: 30 }}
    />
    <ReduxFormControl.Field
      name="surname"
      label="Surname"
      stretch
      placeholder="Sinatra"
      validate={[required, maxLength50]}
      counter={surnameCounter}
      component={TextField}
      style={{ marginBottom: 40 }}
    />
    <Dialog.Buttons>
      <Dialog.Button
        type="submit"
        label="Submit"
        color="green"
        onClick={submit}
      />
    </Dialog.Buttons>
  </Dialog.Paper>
)

export default compose(
  reduxForm({
    form: 'demoForm1',
    onSubmit: data => alert(JSON.stringify(data)),
  })
)(BasicForm)
