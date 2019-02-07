import { createRouteUrl } from '@frankmoney/utils'
import { compose, withProps } from 'recompose'
import AccountLinked from 'components/onboarding/Steps/AccountLinked'
import reconnect from 'utils/reconnect'
import { ROUTES } from 'const'
import * as SELECTORS from '../selectors'

export default compose(
  reconnect({
    accountId: SELECTORS.accountId,
  }),
  withProps(props => ({
    layoutProps: {
      nextButtonProps: {
        // TODO merge actual nextButtonProps with defaults in StepLayout then remove width prop below
        width: 160,
        href: createRouteUrl(ROUTES.account.settings.root, {
          accountId: props.accountId,
        }),
      },
    },
  }))
)(AccountLinked)
