import PropTypes from 'prop-types'
import { compose, withPropsOnChange, getContext, withProps } from 'recompose'
import PaymentSuggestField from 'components/PaymentSuggestField'
import pluralize from 'utils/pluralize'

const querySuggestFields = [
  `
  query(
    $accountId: ID!
    $search: String
  ) {
    account(pid: $accountId) {
      peers(
        sortBy: name_ASC
        search: $search
      ) {
        id: pid
        name
        count: countPayments
      }
    }
  }
    `,
  ({ account: { peers } }) =>
    peers.map(({ id, name, count }) => ({
      text: name,
      data: { id, name },
      secondaryText: pluralize('payment', count),
    })),
]

export default compose(
  getContext({ graphql: PropTypes.func.isRequired }),
  withPropsOnChange(['accountId'], ({ graphql, accountId }) => ({
    querySuggestions: search =>
      graphql(querySuggestFields, { search, accountId }),
  })),
  withPropsOnChange(['onChange'], ({ onChange }) => ({
    onSelect: ({ data: peer }) => onChange(peer.name),
    onChange: name => onChange(name),
  })),
  withProps({ forceCurrentTextSuggestion: true })
)(PaymentSuggestField)
