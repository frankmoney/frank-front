import reconnect from 'utils/reconnect'
import StepLayout from './StepLayout'
import * as ACTIONS from './actions'
import {
  canGoBackSelector,
  canGoNextSelector,
  loadingBackSelector,
  loadingNextSelector,
} from './selectors'

export default reconnect(
  {
    canGoBack: canGoBackSelector,
    canGoNext: canGoNextSelector,
    loadingNext: loadingNextSelector,
    loadingBack: loadingBackSelector,
  },
  {
    onNext: ACTIONS.goNext,
    onBack: ACTIONS.goBack,
  }
)(StepLayout)
