// @flow
import React from 'react'
import cx from 'classnames'
import { compose, renderNothing } from 'recompose'
import { getFormAsyncErrors, reduxForm } from 'redux-form-actions/immutable'
import reconnect from 'utils/reconnect'
import createUploaderField from 'controls/forms/createUploaderField'
import ReduxFormControl from 'components/kit/ReduxFormControl'
import TitleField from 'controls/forms/TitleField'
import DescriptionField from 'controls/forms/DescriptionField'
import StoryPayments from 'components/StoryPayments'
import PaymentsSelectDrawer from 'containers/admin/PaymentsSelect/PaymentsSelectDrawer'
import DRAWER_ACTIONS from 'containers/admin/PaymentsSelect/actions'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import ACTIONS from '../actions'
import {
  formInitialValuesSelector,
  storySelectedPaymentsSelector,
  storySelectedPaymentsIdsSelector,
} from '../selectors'
import { FORM_NAME } from '../constants'
import { CoverUploader } from './MediaUploader'
import { validate } from './validation'

const CoverField = createUploaderField(CoverUploader)

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  published: {
    ...theme.fontRegular(16),
    color: 'rgba(37, 43, 67, 0.5)',
  },
  textFields: {
    marginTop: 45,
    marginLeft: -72,
    minHeight: 478,
  },
  title: {
    marginBottom: 32,
  },
  description: {
    marginBottom: 50,
    color: 'rgba(37, 43, 67, 0.9)',
    '&::placeholder': {
      color: 'rgba(37, 43, 67, 0.3)',
    },
  },
  paymentsValidationMessage: {
    ...theme.fontRegular(16),
    marginBottom: 20,
    color: '#c40a0a',
  },
})

const ConnectedPaymentsSelectDrawer = compose(
  reconnect(
    {
      initialSelectedPayments: storySelectedPaymentsIdsSelector,
    },
    {
      onApply: ACTIONS.modifyStoryPaymentsList,
    }
  )
)(PaymentsSelectDrawer)

const ConnectedStoryPayments = reconnect(
  {
    payments: storySelectedPaymentsSelector,
  },
  {
    onEdit: () => DRAWER_ACTIONS.open({ pending: false, verified: true }),
    onRemovePayment: id => ACTIONS.modifyStoryPaymentsList({ removeIds: [id] }),
  }
)(StoryPayments)

type Props = {|
  ...InjectStylesProps,
  formAsyncErrors: ?{
    get(field: 'title' | 'description' | 'payments'): string,
  },
|}

const StoryEditForm = ({ classes, className, formAsyncErrors }: Props) => (
  <div className={cx(classes.container, className)}>
    <CoverField
      name="cover"
      buttonLabel="Add a cover photo"
      hint="optional, 1000+ pixels wide, no text over image"
      className={classes.coverImageUploader}
    />
    <div className={classes.textFields}>
      <TitleField
        name="title"
        className={classes.title}
        placeholder="Title..."
        iconProps={{
          invalid: !!(formAsyncErrors && formAsyncErrors.get('title')),
        }}
      />
      <DescriptionField
        name="description"
        className={classes.description}
        placeholder="Your story..."
        iconProps={{
          invalid: !!(formAsyncErrors && formAsyncErrors.get('description')),
        }}
      />
    </div>

    {formAsyncErrors &&
      formAsyncErrors.get('payments') && (
        <div className={classes.paymentsValidationMessage}>
          Please add payments to publish a story
        </div>
      )}
    <ReduxFormControl.Field name="payments" component={renderNothing} />

    <ConnectedStoryPayments />
    <ConnectedPaymentsSelectDrawer />
  </div>
)

export default compose(
  reconnect({
    initialValues: formInitialValuesSelector,
    formAsyncErrors: getFormAsyncErrors(FORM_NAME),
  }),
  reduxForm({
    form: FORM_NAME,
    enableReinitialize: true,
    validate,
  }),
  injectStyles(styles)
)(StoryEditForm)
