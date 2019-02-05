import { createRouteUrl } from '@frankmoney/utils'
import { compose, mapProps, withProps } from 'recompose'
import reconnect from 'utils/reconnect'
import Credentials from 'components/onboarding/Steps/Credentials'
import { ROUTES } from 'const'
import * as ACTIONS from '../actions'
import { STEP_FORM } from '../constants'
import * as SELECTORS from '../selectors'

export default compose(
  withProps({ formName: STEP_FORM }),
  reconnect(
    {
      fields: SELECTORS.credentialFields,
      accountId: SELECTORS.accountId,
      isLoading: SELECTORS.loading,
      bankName: SELECTORS.bankName,
      bankLogoUrl: SELECTORS.bankLogoUrl,
      isFormValid: SELECTORS.isFormValid,
    },
    {
      onFormSubmit: ACTIONS.sendCredentials,
      onNext: ACTIONS.sendCredentials,
    }
  ),
  mapProps(({ onNext, isLoading, isFormValid, accountId, ...props }) => ({
    ...props,
    isChecking: isLoading,
    formDisabled: isLoading,
    layoutProps: {
      canGoNext: isFormValid,
      onNext,
      loadingNext: isLoading,
      canGoBack: true,
      backLabel: 'Account settings',
      backButtonProps: {
        href: createRouteUrl(ROUTES.account.settings.root, {
          accountId,
        }),
      },
    },
  }))
)(Credentials)
