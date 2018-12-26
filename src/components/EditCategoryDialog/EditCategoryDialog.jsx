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
import { CATEGORY_PALETTE } from 'const'
import TextField from 'components/kit/TextField'
import CategoryTextField from 'components/kit/CategoryTextField'
import CategorySelect from 'components/CategorySelect'
import { customColorModeSelector, customColorSelector } from './selectors'
import {
  COLORS_AND_CUSTOM,
  FORM_NAME,
  createEmptyCategory,
  isCustomColor,
} from './constants'

const styles = {
  root: {},
  field: {
    marginBottom: 25,
  },
  colorField: {
    composes: '$field',
  },
  customColorMode: {
    '& $colorField': {
      display: 'none',
    },
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
  customColorMode,
  customColor,
}) => (
  <ConfirmDialog
    fallInsideFocus={false}
    className={cx(
      classes.root,
      { [classes.customColorMode]: customColorMode },
      className
    )}
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
      component={CategorySelect}
      categories={COLORS_AND_CUSTOM}
      label="Color"
      name="color"
      className={classes.colorField}
      validate={validations.color}
    />
    <ReduxFormControl.Field
      name="name"
      className={classes.field}
      label="Category name"
      validate={validations.name}
      autoFocus
      stretch
      color={customColor}
      component={customColorMode ? CategoryTextField : TextField}
    />
    {customColorMode && (
      <ReduxFormControl.Palette
        palette={CATEGORY_PALETTE}
        defaultValue={CATEGORY_PALETTE[0][0]}
        label="Color"
        name="customColor"
        className={classes.field}
        validate={validations.field}
        sampleWidth={81.4}
      />
    )}
  </ConfirmDialog>
)

export default compose(
  withPropsOnChange(
    ['category', 'defaultType'],
    ({ category, defaultType }) => {
      if (!category) {
        return {
          initialValues: {
            ...createEmptyCategory(),
            type: defaultType,
          },
        }
      }

      const isCustom = isCustomColor(category.color)

      return {
        initialValues: {
          type: category.type,
          name: category.name,
          color: isCustom ? 'custom' : category.color,
          customColor: isCustom ? category.color : null,
        },
      }
    }
  ),
  reconnect({
    customColorMode: customColorModeSelector,
    customColor: customColorSelector,
  }),
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
