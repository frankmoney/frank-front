import React from 'react'
import cx from 'classnames'
import sample from 'lodash/sample'
import { compose, withPropsOnChange } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import { reduxForm } from 'redux-form/immutable'
import { ConfirmDialog } from '@frankmoney/components'
import { required } from '@frankmoney/forms'
import { CATEGORY_COLORS } from 'const'
import { Field } from 'components/Field'
import TextBoxField from 'components/forms/TextBoxField'
import ColorSelectField from 'components/forms/ColorSelectField'

const styles = {
  root: {},
  field: {
    marginBottom: 25,
  },
}

const FORM_NAME = 'save-category'

const validations = {
  name: [required],
  color: [required],
}

const EditCategoryDialog = ({
  classes,
  className,
  category,
  submitting,
  submit,
  invalid,
  open,
  onCancel,
}) => (
  <ConfirmDialog
    className={cx(classes.root, className)}
    title={`${!category ? 'Add new' : 'Edit'} category`}
    confirmLabel="Add"
    cancelLabel="Cancel"
    open={open}
    onClose={onCancel}
    onCancel={onCancel}
    onConfirm={submit}
  >
    <Field title="Color" className={classes.field}>
      <ColorSelectField name="color" validate={validations.color} />
    </Field>
    <Field title="Category name" className={classes.field}>
      <TextBoxField name="name" validate={validations.name} autoFocus />
    </Field>
  </ConfirmDialog>
)

const EMPTY_CATEGORY = {
  color: sample(Object.keys(CATEGORY_COLORS)),
}

export default compose(
  withPropsOnChange(['category'], props => ({
    initialValues: props.category || EMPTY_CATEGORY,
  })),
  reduxForm({
    form: FORM_NAME,
    enableReinitialize: true,
    onSubmit: (values, _, props) => props.onSubmit(values),
  }),
  injectStyles(styles)
)(EditCategoryDialog)
