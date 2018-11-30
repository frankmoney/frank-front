import { compose, withProps } from 'recompose'
import Ledger from 'containers/public/Ledger'
import Story from 'containers/public/Story'
import Payment from 'containers/public/Payment'
import { ROUTES } from 'const'

const ComposedLedger = compose(
  withProps(props => ({
    accountId: props.match.params.accountId,
  }))
)(Ledger)

const ComposedStory = compose(
  withProps(props => ({
    accountId: props.match.params.accountId,
    storyId: props.match.params.storyId,
  }))
)(Story)

const ComposedPayment = compose(
  withProps(props => ({
    accountId: props.match.params.accountId,
    paymentId: props.match.params.paymentId,
  }))
)(Payment)

export default [
  {
    component: ComposedLedger,
    path: ROUTES.public.ledger.idRootTab,
    exact: true,
  },
  {
    component: ComposedStory,
    path: ROUTES.public.story.idRoot,
    exact: true,
  },
  {
    component: ComposedPayment,
    path: ROUTES.public.payment.idRoot,
    exact: true,
  },
]
