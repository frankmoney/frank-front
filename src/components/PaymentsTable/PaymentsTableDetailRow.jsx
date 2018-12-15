import { mapProps, compose } from 'recompose'
import PaymentCard from 'containers/admin/PaymentCard'

export default compose(
  mapProps(({ data, ...otherProps }) => ({
    ...data,
    ...otherProps,
  }))
)(PaymentCard)
