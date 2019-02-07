import { createRouteUrl } from '@frankmoney/utils'
import { compose, mapProps, withProps } from 'recompose'
import VerifyIdentity from 'components/onboarding/Steps/VerifyIdentity'
import reconnect from 'utils/reconnect'
import { ROUTES } from 'const'
import * as ACTIONS from '../actions'
import { STEP_FORM } from '../constants'
import * as SELECTORS from '../selectors'

export default compose(
  withProps({ formName: STEP_FORM }),
  reconnect(
    {
      accountId: SELECTORS.accountId,
      fields: SELECTORS.mfaFields,
      isChecking: SELECTORS.loading,
      bankName: SELECTORS.bankName,
      bankLogoUrl: SELECTORS.bankLogoUrl,
      isFormValid: SELECTORS.isFormValid,
    },
    {
      onFormSubmit: ACTIONS.sendMFA,
      onNext: ACTIONS.sendMFA,
    }
  ),
  mapProps(({ onNext, isChecking, isFormValid, accountId, ...props }) => ({
    ...props,
    isChecking,
    formDisabled: isChecking,
    layoutProps: {
      canGoNext: isFormValid,
      onNext,
      loadingNext: isChecking,
      backLabel: 'Account settings',
      backButtonProps: {
        href: createRouteUrl(ROUTES.account.settings.root, {
          accountId,
        }),
      },
    },
  }))
)(VerifyIdentity)
