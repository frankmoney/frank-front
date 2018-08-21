import React from 'react'
import cx from 'classnames'
import * as R from 'ramda'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form-actions/immutable'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { injectStyles } from '@frankmoney/ui'
import createUploaderField from 'controls/forms/createUploaderField'
import BigTextField from 'controls/forms/BigTextField'
import DescriptionField from 'controls/forms/DescriptionField'
import StoryPayments from 'components/StoryPayments'
import PaymentsSelectorDrawer from 'components/PaymentsSelectorDrawer'
import StoryDeleteConfirmDialog from 'components/dialogs/StoryDeleteConfirmDialog'
import {
  formInitialValuesSelector,
  paymentsSelector,
  storySelectedPaymentsSelector,
  paymentsListUpdatingSelector,
  paymentsTotalPagesCounterSelector,
  paymentsLoadedPagesCounterSelector,
} from '../selectors'
import ACTIONS from '../actions'
import { FORM_NAME } from '../constants'
import { CoverUploader } from './MediaUploader'

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
  title: {
    marginTop: 45,
    marginBottom: 18,
  },
  description: {
    minHeight: 323,
    ...theme.fontRegular(20, 32),
    color: 'rgba(37, 43, 67, 0.9)',
    '&::placeholder': {
      color: 'rgba(37, 43, 67, 0.3)',
    },
  },
})

const mapStateToPropsForDrawer = createStructuredSelector({
  isUpdating: paymentsListUpdatingSelector,
  payments: paymentsSelector,
  selectedPayments: storySelectedPaymentsSelector,
  totalPagesCounter: paymentsTotalPagesCounterSelector,
  loadedPagesCounter: paymentsLoadedPagesCounterSelector,
})

const mapDispatchToPropsForDrawer = R.partial(bindActionCreators, [
  {
    onChange: ACTIONS.modifyStoryPaymentsList,
    onLoadMore: ACTIONS.loadMorePayments,
  },
])

const ConnectedPaymentsSelectorDrawer = compose(
  connect(
    mapStateToPropsForDrawer,
    mapDispatchToPropsForDrawer
  )
)(PaymentsSelectorDrawer)

const ConnectedStoryPayments = compose(
  connect(
    createStructuredSelector({
      payments: storySelectedPaymentsSelector,
    })
  )
)(StoryPayments)

class StoryEditForm extends React.PureComponent {
  state = {
    isDrawerOpen: false,
    isConfirmDialogOpen: false,
  }

  handleToggleDrawer = () => {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen })
  }

  handleToggleConfirmDialog = () => {
    this.setState({ isConfirmDialogOpen: !this.state.isConfirmDialogOpen })
  }

  render() {
    const { classes, className } = this.props

    const { isDrawerOpen, isConfirmDialogOpen } = this.state

    return (
      <div className={cx(classes.container, className)}>
        <CoverField
          name="coverImage"
          buttonLabel="Add a cover photo"
          hint="optional, 1000+ pixels wide, no text over image"
          className={classes.coverImageUploader}
        />
        <BigTextField name="title" className={classes.title} label="Title" />
        <DescriptionField
          name="description"
          className={classes.description}
          placeholder="Tell about your project. Why is that important? Who are you doing it for? What are the first steps you will take?"
        />

        <ConnectedStoryPayments onEdit={this.handleToggleDrawer} />
        <ConnectedPaymentsSelectorDrawer
          open={isDrawerOpen}
          onClose={this.handleToggleDrawer}
        />
        <StoryDeleteConfirmDialog open={isConfirmDialogOpen} />
      </div>
    )
  }
}
export default compose(
  connect(state => ({
    initialValues: formInitialValuesSelector(state),
  })),

  /*
  connect(
    state => ({
      initialValues: formInitialValuesSelector(state),
      tags: tagsSelector(state),
      isAnyTagSelected: isAnyTagSelectedSelector(state),
    }),
    dispatch => ({
      onSubmit: data => dispatch(saveEvent(data && data.toJS())),
      succeededAction: saveEvent.success.toString(),
      failedAction: saveEvent.error.toString(),
    })
  ),
  */
  reduxForm({
    form: FORM_NAME,
    enableReinitialize: true,
  }),
  injectStyles(styles)
)(StoryEditForm)
