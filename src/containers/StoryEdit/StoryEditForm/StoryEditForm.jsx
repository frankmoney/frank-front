import React from 'react'
import cx from 'classnames'
import { compose, withProps } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form-actions/immutable'
import { createStructuredSelector } from 'reselect'
import { injectStyles } from '@frankmoney/ui'
import { LeaveUnsavedFormPrompt } from '@frankmoney/webapp'
import reconnect from 'utils/reconnect'
import createUploaderField from 'controls/forms/createUploaderField'
import TitleField from 'controls/forms/TitleField'
import DescriptionField from 'controls/forms/DescriptionField'
import StoryPayments from 'components/StoryPayments'
import PaymentsSelectorDrawer from 'components/PaymentsSelectorDrawer'
import {
  formInitialValuesSelector,
  paymentsSelector,
  unsavedFormSelector,
  storySelectedPaymentsSelector,
  paymentsListUpdatingSelector,
  paymentsTotalPagesCounterSelector,
  paymentsLoadedPagesCounterSelector,
  paymentsFiltersSelector,
} from '../selectors'
import ACTIONS from '../actions'
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
})

const ConnectedPaymentsSelectorDrawer = reconnect(
  {
    isUpdating: paymentsListUpdatingSelector,
    payments: paymentsSelector,
    filter: paymentsFiltersSelector,
    selectedPayments: storySelectedPaymentsSelector,
    totalPagesCounter: paymentsTotalPagesCounterSelector,
    loadedPagesCounter: paymentsLoadedPagesCounterSelector,
  },
  {
    onChange: ACTIONS.modifyStoryPaymentsList,
    onLoadMore: ACTIONS.loadMorePayments,
    onFilter: ACTIONS.filterPayments,
  }
)(PaymentsSelectorDrawer)

const ConnectedStoryPayments = connect(
  createStructuredSelector({
    payments: storySelectedPaymentsSelector,
  })
)(StoryPayments)

const ConnectedLeaveUnsavedFormPrompt = compose(
  connect(state => ({
    when: unsavedFormSelector(state),
  })),
  withProps({
    message:
      'You will lose unsaved changes if you navigate away without saving. Would you like to continue?',
  })
)(LeaveUnsavedFormPrompt)

class StoryEditForm extends React.PureComponent {
  state = {
    isDrawerOpen: false,
  }

  handleToggleDrawer = () => {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen })
  }

  render() {
    const { classes, className } = this.props
    const { isDrawerOpen } = this.state

    return (
      <div className={cx(classes.container, className)}>
        <CoverField
          name="coverImage"
          buttonLabel="Add a cover photo"
          hint="optional, 1000+ pixels wide, no text over image"
          className={classes.coverImageUploader}
        />
        <div className={classes.textFields}>
          <TitleField
            name="title"
            className={classes.title}
            placeholder="Title..."
          />
          <DescriptionField
            name="description"
            className={classes.description}
            placeholder="Your story..."
          />
        </div>

        <ConnectedStoryPayments onEdit={this.handleToggleDrawer} />
        <ConnectedPaymentsSelectorDrawer
          open={isDrawerOpen}
          onClose={this.handleToggleDrawer}
        />
        <ConnectedLeaveUnsavedFormPrompt />
      </div>
    )
  }
}
export default compose(
  connect(state => ({
    initialValues: formInitialValuesSelector(state),
  })),
  reduxForm({
    form: FORM_NAME,
    enableReinitialize: true,
    validate,
  }),
  injectStyles(styles)
)(StoryEditForm)
