import PropTypes from 'prop-types'
import { compose, withPropsOnChange, getContext } from 'recompose'
import PaymentSuggestField from 'components/PaymentSuggestField'
import * as QUERY from './queries'

export default compose(
  getContext({ graphql: PropTypes.func.isRequired }),
  withPropsOnChange(
    ['accountId', 'paymentId'],
    ({ graphql, paymentId, accountId }) => ({
      querySuggestions: search =>
        graphql(
          paymentId
            ? QUERY.paymentSuggestDescriptions
            : QUERY.accountSuggestDescriptions,
          { search, accountId, paymentId }
        ),
    })
  ),
  withPropsOnChange(['onChange'], ({ onChange }) => ({
    onSelect: ({ data: description }) => onChange(description),
  }))
)(PaymentSuggestField)
