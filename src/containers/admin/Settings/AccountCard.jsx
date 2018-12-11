// @flow strict-local
// spellchecker:ignore mmaa
import React from 'react'
import cx from 'classnames'
import { required, maxLength, createValidateFromRules } from '@frankmoney/forms'
import { compose } from 'recompose'
import { reduxForm } from 'redux-form/immutable'
import { injectStyles } from 'utils/styles'
import Paper from 'components/kit/Paper'
import TextField from 'components/kit/TextField'
import ReduxFormControl from 'components/kit/ReduxFormControl'
import Switch from 'components/kit/Switch'
import Button from 'components/kit/Button'
import CardTitle from './CardTitle'

const validation = {
  name: [required, maxLength(40)],
  description: [required, maxLength(200)],
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

const AccountCard = ({ classes, className }) => (
  <Paper type="card" className={cx(classes.root, className)}>
    <CardTitle className={classes.title} text="Account info" />
    <ReduxFormControl.Field
      name="accountName"
      validate={validation.name}
      counter={counters.name}
      component={TextField}
      className={classes.field}
      floatingLabel="Account name"
      larger
      autoFocus
    />
    <ReduxFormControl.Field
      name="accountDescription"
      validate={validation.description}
      counter={counters.description}
      component={TextField}
      className={classes.field}
      floatingLabel="Description"
      multiLine
    />
    <div className={classes.bottomLine}>
      <Switch className={classes.switch} label="Private account" />
      <Button className={classes.button} label="Save" color="green" />
    </div>
  </Paper>
)

export default compose(
  injectStyles(styles),
  reduxForm({
    form: 'settings-account',
    enableReinitialize: true,
    validate,
    onSubmit: (data, _, props) => {},
  })
)(AccountCard)
