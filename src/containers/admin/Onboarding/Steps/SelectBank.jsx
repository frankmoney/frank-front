// @flow
import {
  branch,
  compose,
  lifecycle,
  renderComponent,
  withStateHandlers,
} from 'recompose'
import SelectBank from 'components/onboarding/Steps/SelectBank'
import Terms from 'components/onboarding/Steps/Terms'
import reconnect from 'utils/reconnect'
import {
  filteredBankListSelector,
  bankSearchSelector,
  banksLoadedSelector,
  banksLoadingSelector,
  selectedBankIdSelector,
} from '../selectors'
import * as ACTIONS from '../actions'

export default compose(
  reconnect(
    {
      loaded: banksLoadedSelector,
      loading: banksLoadingSelector,
      banks: filteredBankListSelector,
      selectedBankId: selectedBankIdSelector,
      search: bankSearchSelector,
    },
    {
      selectBank: ACTIONS.bankSelect,
      load: ACTIONS.loadBanks,
      onSearch: ACTIONS.bankNameType,
      onResetSearch: ACTIONS.banksResetSearch,
    }
  ),
  withStateHandlers(
    { termsAccepted: false },
    {
      onNext: () => () => ({ termsAccepted: true }),
    }
  ),
  branch(props => !props.termsAccepted, renderComponent(Terms)),
  lifecycle({
    componentWillMount() {
      if (!this.props.loaded) {
        this.props.load()
      }
    },
  })
)(SelectBank)
