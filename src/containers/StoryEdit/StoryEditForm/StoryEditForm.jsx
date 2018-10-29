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
import TitleField from 'controls/forms/TitleField'
import DescriptionField from 'controls/forms/DescriptionField'
import StoryPayments from 'components/StoryPayments'
import PaymentsSelectorDrawer from 'components/PaymentsSelectorDrawer'
import {
  formInitialValuesSelector,
  paymentsSelector,
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

const mapStateToPropsForDrawer = createStructuredSelector({
  isUpdating: paymentsListUpdatingSelector,
  payments: paymentsSelector,
  filter: paymentsFiltersSelector,
  selectedPayments: storySelectedPaymentsSelector,
  totalPagesCounter: paymentsTotalPagesCounterSelector,
  loadedPagesCounter: paymentsLoadedPagesCounterSelector,
})

const mapDispatchToPropsForDrawer = R.partial(bindActionCreators, [
  {
    onChange: ACTIONS.modifyStoryPaymentsList,
    onLoadMore: ACTIONS.loadMorePayments,
    onFilter: ACTIONS.filterPayments,
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
