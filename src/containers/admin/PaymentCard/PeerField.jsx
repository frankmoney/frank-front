import PropTypes from 'prop-types'
import { compose, withPropsOnChange, getContext, withProps } from 'recompose'
import PaymentSuggestField from './PaymentSuggestField'
import QUERY from './queries'

export default compose(
  getContext({ graphql: PropTypes.func.isRequired }),
  withPropsOnChange(['accountId'], ({ graphql, accountId }) => ({
    querySuggestions: search =>
      graphql(QUERY.suggestPeers, { search, accountId }),
  })),
  withPropsOnChange(['onChange'], ({ onChange }) => ({
    onSelect: ({ data: peer }) => onChange(peer.name),
    onChange: name => onChange(name),
  })),
  withProps({ forceCurrentTextSuggestion: true })
)(PaymentSuggestField)
