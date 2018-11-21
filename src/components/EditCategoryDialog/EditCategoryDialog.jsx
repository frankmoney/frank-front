import React from 'react'
import cx from 'classnames'
import sample from 'lodash/sample'
import { compose, withPropsOnChange } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import { reduxForm } from 'redux-form/immutable'
import { required } from '@frankmoney/forms'
import ReduxFormControl from 'components/kit/ReduxFormControl'
import { ConfirmDialog } from 'components/kit/Dialog'
import { CATEGORY_COLORS } from 'const'
import TextField from 'components/kit/TextField'
import CategorySelect from 'components/CategorySelect'

const COLORS = Object.entries(CATEGORY_COLORS).map(([color, name]) => ({
  id: color,
  color,
  name,
}))

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
  submit,
  invalid,
  open,
  onCancel,
}) => (
  <ConfirmDialog
    fallInsideFocus={false}
    className={cx(classes.root, className)}
    title={`${!category ? 'Add new' : 'Edit'} category`}
    confirmLabel="Done"
    cancelLabel="Cancel"
    confirmButtonProps={{ disabled: invalid }}
    open={open}
    onClose={onCancel}
    onCancel={onCancel}
    onConfirm={submit}
  >
    <ReduxFormControl.Field
      component={CategorySelect}
      categories={COLORS}
      label="Color"
      name="color"
      className={classes.field}
      validate={validations.color}
    />
    <ReduxFormControl.Field
      name="name"
      className={classes.field}
      label="Category name"
      validate={validations.name}
      autoFocus
      stretch
      component={TextField}
    />
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
