import { compose, mapProps, pure } from 'recompose'
import reconnect from 'utils/reconnect'
import * as ACTIONS from './actions'
import {
  canGoBackSelector,
  canGoNextSelector,
  loadingBackSelector,
  isLoadingNextOrPollingSelector,
} from './selectors'

export default compose(
  reconnect(
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
  ),
  mapProps(
    ({
      canGoBack,
      canGoNext,
      loadingNext,
      loadingBack,
      onNext,
      onBack,
      ...props
    }) => ({
      ...props,
      layoutProps: {
        canGoBack,
        canGoNext,
        loadingNext,
        loadingBack,
        onNext,
        onBack,
      },
    })
  ),
  pure
)
