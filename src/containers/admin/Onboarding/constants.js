export const STEPS = [
  'bank',
  'credentials',
  'mfa',
  'account',
  'accountInfo',
  'categories',
  'team',
  'success',
]

export const STEP_FORM = 'onboarding-dynamic-form'
export const ACCOUNT_FORM = 'onboarding-account-info'

export const CREDENTIALS_STATUS = {
  initial: 'awaiting_input',
  checking: 'checking',
  failed: 'failed',
  denied: 'denied',
  mfa: 'mfa_expired',
}
