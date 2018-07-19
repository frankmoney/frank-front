import { mapProps, compose } from 'recompose'
import InboxCard from 'components/InboxCard'

export default compose(
  mapProps(({ data, ...otherProps }) => ({
    ...data,
    ...otherProps,
  }))
)(InboxCard)
