// @flow
import React from 'react'
import { compose, branch, renderComponent, lifecycle } from 'recompose'
import AreaSpinner from 'components/AreaSpinner'
import reconnect from 'utils/reconnect'
import connectLayout from './connectLayout'
import * as ACTIONS from './actions'
import {
  currentStepSelector,
  loadingSelector,
  loadedSelector,
  termsAcceptedSelector,
} from './selectors'
import * as STEPS from './Steps'

const componentByStep = {
  bank: connectLayout(STEPS.SelectBank),
  account: connectLayout(STEPS.SelectAccount),
  credentials: connectLayout(STEPS.Credentials),
  mfa: connectLayout(STEPS.Verify),
  accountInfo: connectLayout(STEPS.AccountInfo),
  categories: connectLayout(STEPS.Categories),
  team: connectLayout(STEPS.Team),
  success: connectLayout(STEPS.Success),
}

const Onboarding = ({ currentStep, ...props }) => {
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
  branch(props => props.loading, renderComponent(AreaSpinner))
)(Onboarding)
