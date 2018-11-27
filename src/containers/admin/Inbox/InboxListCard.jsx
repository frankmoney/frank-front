// @flow
import { compose, mapProps, withHandlers } from 'recompose'
import PaymentCard from 'components/admin/PaymentCard'
import reconnect from 'utils/reconnect'
import ACTIONS from './actions'
import * as SELECTORS from './selectors'

export default compose(
  reconnect(
    {
      categories: SELECTORS.categories,
      // searchingSuggestions: searchingSuggestionsSelector,
      // suggestedPeers: suggestedPeersSelector,
    },
    {
      searchSuggestions: ACTIONS.searchSuggestions,
      paymentUpdate: ACTIONS.paymentUpdate,
      paymentPublish: ACTIONS.paymentPublish,
    }
  ),
  mapProps(({ categories, peers, data, ...otherProps }) => ({
    categories,
    peers,
    ...data,
    ...otherProps,
  })),
  withHandlers({
    onPeerSuggestionSearch: ({ searchSuggestions }) => search => {
      searchSuggestions({ search, peers: true })
    },
    onDescriptionSuggestionSearch: ({ searchSuggestions }) => search => {
      searchSuggestions({ search, descriptions: true })
    },
    onPaymentUpdate: ({ paymentUpdate }) => changes => {
      paymentUpdate(changes)
    },
    onPaymentPublish: ({ paymentPublish }) => () => {
      paymentPublish()
    },
  })
)(PaymentCard)
