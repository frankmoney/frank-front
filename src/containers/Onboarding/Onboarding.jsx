import React from 'react'
import { compose, branch, renderComponent, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { injectStyles } from '@frankmoney/ui'
import { PageLoader } from '@frankmoney/components'
import { createStructuredSelector } from 'reselect'
import styles from './Onboarding.jss'
import { currentStepSelector } from './selectors'
import * as STEPS from './Steps'

const Onboarding = ({ currentStep, ...props }) => {
  const StepComponent = {
    bank: STEPS.SelectBank,
    account: STEPS.SelectAccount,
    credentials: STEPS.Credentials,
    verify: STEPS.Verify,
    accountInfo: STEPS.AccountInfo,
    categories: STEPS.Categories,
    team: STEPS.Team,
  }[currentStep]

  return <StepComponent {...props} />
}

const mapStateToProps = createStructuredSelector({
  currentStep: currentStepSelector,
})

export default compose(
  connect(mapStateToProps),
  lifecycle({
    // componentWillMount() {
    //   if (!this.props.loaded) {
    //     this.props.load()
    //   }
    // },
    componentWillUnmount() {
      this.props.leave()
    },
  }),
  branch(props => props.loading, renderComponent(PageLoader)),
  injectStyles(styles, { grid: true })
)(Onboarding)
