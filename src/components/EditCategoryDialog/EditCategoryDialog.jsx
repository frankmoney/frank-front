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

const createEmptyCategory = () => ({
  color: sample(Object.keys(CATEGORY_COLORS)),
  name: '',
})

export default compose(
  withPropsOnChange(['category'], props => ({
    initialValues: props.category || createEmptyCategory(),
    form: `edit-category-${props.id || 'new'}`,
  })),
  reduxForm({
    enableReinitialize: true,
    onSubmit: (values, _, props) => {
      props.onSubmitForm(values && values.toJS())
      if (props.form === 'edit-category-new') {
        props.reset()
        const category = createEmptyCategory()
        props.change('color', category.color)
        props.change('name', category.name)
      }
    },
  }),
  injectStyles(styles)
)(EditCategoryDialog)
