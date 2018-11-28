import PropTypes from 'prop-types'
import { compose, withPropsOnChange, getContext } from 'recompose'
import PaymentSuggestField from './PaymentSuggestField'
import QUERY from './queries'

export default compose(
  getContext({ graphql: PropTypes.func.isRequired }),
  withPropsOnChange(
    ['accountId', 'paymentId'],
    ({ graphql, accountId, paymentId }) => ({
      querySuggestions: search =>
        graphql(QUERY.suggestDescriptions, { search, accountId, paymentId }),
    })
  ),
  withPropsOnChange(['onChange'], ({ onChange }) => ({
    onSelect: ({ data: description }) => onChange(description),
  }))
)(PaymentSuggestField)
