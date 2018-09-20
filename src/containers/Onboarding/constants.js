export const STEPS = [
  'bank',
  'credentials',
  'verify',
  'account',
  'accountInfo',
  'categories',
  'team',
]

export const CREDENTIALS_FORM = 'onboarding-credentials'
export const ACCOUNT_FORM = 'onboarding-account-info'

export const CREDENTIALS_STATUS = {
  initial: 'awaiting_input',
  checking: 'checking',
  failed: 'failed',
  denied: 'denied',
  mfa: 'mfa_expired',
}
