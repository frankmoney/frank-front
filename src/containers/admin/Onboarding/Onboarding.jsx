// @flow
import React from 'react'
import { compose, branch, renderComponent, lifecycle } from 'recompose'
import AreaSpinner from 'components/AreaSpinner'
import reconnect from 'utils/reconnect'
import * as ACTIONS from './actions'
import {
  currentStepSelector,
  loadingSelector,
  loadedSelector,
  termsAcceptedSelector,
} from './selectors'
import * as STEPS from './Steps'

const Onboarding = ({ currentStep, ...props }) => {
  const componentByStep = {
    bank: STEPS.SelectBank,
    account: STEPS.SelectAccount,
    credentials: STEPS.Credentials,
    mfa: STEPS.Verify,
    accountInfo: STEPS.AccountInfo,
    categories: STEPS.Categories,
    team: STEPS.Team,
  }

  const StepComponent = componentByStep[currentStep]

  return <StepComponent {...props} />
}

export default compose(
  reconnect(
    {
      currentStep: currentStepSelector,
      loading: loadingSelector,
      loaded: loadedSelector,
      termsAccepted: termsAcceptedSelector,
    },
    {
      load: ACTIONS.load,
      leave: ACTIONS.leave,
    }
  ),
  lifecycle({
    componentWillMount() {
      if (!this.props.loaded) {
        this.props.load()
      }
    },
    componentWillUnmount() {
      this.props.leave()
    },
  }),
  branch(props => props.loading, renderComponent(AreaSpinner)),
  branch(props => !props.termsAccepted, renderComponent(STEPS.Terms))
)(Onboarding)
