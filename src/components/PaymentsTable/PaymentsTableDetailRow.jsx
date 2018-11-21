import { mapProps, compose } from 'recompose'
import PaymentCard from 'components/admin/PaymentCard'

export default compose(
  mapProps(({ data, ...otherProps }) => ({
    ...data,
    ...otherProps,
  }))
)(PaymentCard)
