// @flow
import PaymentCard from 'containers/admin/PaymentCard'
import reconnect from 'utils/reconnect'
import * as SELECTORS from './selectors'

export default reconnect({
  categories: SELECTORS.categories,
})(PaymentCard)
