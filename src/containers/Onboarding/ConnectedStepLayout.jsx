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
    goNext: ACTIONS.goNext,
    goBack: ACTIONS.goBack,
  }
)(StepLayout)
