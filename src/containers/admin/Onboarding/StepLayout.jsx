import reconnect from 'utils/reconnect'
import StepLayout from 'components/onboarding/StepLayout'
import * as ACTIONS from './actions'
import {
  canGoBackSelector,
  canGoNextSelector,
  loadingBackSelector,
  isLoadingNextOrPollingSelector,
} from './selectors'

export default reconnect(
  {
    canGoBack: canGoBackSelector,
    canGoNext: canGoNextSelector,
    loadingNext: isLoadingNextOrPollingSelector,
    loadingBack: loadingBackSelector,
  },
  {
    onNext: ACTIONS.goNext,
    onBack: ACTIONS.goBack,
  }
)(StepLayout)
