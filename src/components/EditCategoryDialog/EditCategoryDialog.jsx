// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { compose, withPropsOnChange } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import { reduxForm } from 'redux-form-actions/immutable'
import { required } from '@frankmoney/forms'
import reconnect from 'utils/reconnect'
import ReduxFormControl from 'components/kit/ReduxFormControl'
import { ConfirmDialog } from 'components/kit/Dialog'
import { CATEGORY_PALETTE, INCOME_CATEGORY_PALETTE } from 'const'
import CategoryTextField from 'components/kit/CategoryTextField'
import { colorSelector } from './selectors'
import { FORM_NAME, createEmptyCategory } from './constants'

const styles = {
  root: {},
  field: {
    marginBottom: 25,
  },
  colorField: {
    composes: '$field',
  },
}

const validations = {
  name: [required],
  color: [required],
}

const ConnectedCategoryTextField = reconnect({
  color: colorSelector,
})(CategoryTextField)

const EditCategoryDialog = ({
  classes,
  className,
  category,
  submitting,
  submit,
  invalid,
  open,
  onCancel,
  defaultType,
}) => (
  <ConfirmDialog
    fallInsideFocus={false}
    className={cx(classes.root, className)}
    title={`${!category ? 'Add new' : 'Edit'} category`}
    confirmLabel="Done"
    confirmButtonProps={{ loading: submitting, disabled: invalid }}
    open={open}
    onClose={onCancel}
    onCancel={onCancel}
    disableCloseOnConfirm
    onConfirm={submit}
  >
    <ReduxFormControl.Field
      name="name"
      className={classes.field}
      label="Category name"
      validate={validations.name}
      autoFocus
      stretch
      component={ConnectedCategoryTextField}
    />
    <ReduxFormControl.Palette
      palette={
        defaultType === 'spending' ? CATEGORY_PALETTE : INCOME_CATEGORY_PALETTE
      }
      defaultValue={CATEGORY_PALETTE[0][0]}
      label="Color"
      name="color"
      className={classes.field}
      validate={validations.field}
      stretch
    />
  </ConfirmDialog>
)

export default compose(
  withPropsOnChange(
    ['category', 'defaultType'],
    ({ category, defaultType }) => {
      if (!category) {
        return {
          initialValues: {
            ...createEmptyCategory(defaultType),
            type: defaultType,
          },
        }
      }

      return {
        initialValues: {
          type: category.type,
          name: category.name,
          color: category.color,
        },
      }
    }
  ),
  withPropsOnChange(
    [
      'formSubmissionFailedAction',
      'formSubmissionSucceededAction',
      'onSubmitForm',
    ],
    ({
      formSubmissionFailedAction,
      formSubmissionSucceededAction,
      onSubmitForm,
    }) => ({
      failedAction: formSubmissionFailedAction,
      succeededAction: formSubmissionSucceededAction,
      onSubmit: (values, dispatch, props) => {
        if (onSubmitForm) {
          const category = props.category
          const data = values && values.toJS()
          onSubmitForm({
            id: category && category.id,
            type: data.type || (category && category.type) || props.defaultType,
            name: data.name,
            color: data.customColor || data.color,
          })
        }
      },
    })
  ),
  reduxForm({
    enableReinitialize: true,
    form: FORM_NAME,
  }),
  injectStyles(styles)
)(EditCategoryDialog)
