export default {
  listBanks: [
    `query($filter: String) {
      onboardingInstitutions(name: $filter)
    }`,
    ({ onboardingInstitutions }) => onboardingInstitutions,
  ],
  getOnboardingSession: [
    `
    query {
      onboarding {
        step
        institution
        credentials
        accounts
        account
        categories
      }
    }
    `,
    ({ onboarding }) => onboarding,
  ],
  selectBank: [
    `mutation($id: String!) {
      onboarding: onboardingSelectInstitution(
          institutionCode: $id
      ) {
        step
        institution
        credentials
      }
    }`,
    ({ onboarding }) => onboarding,
  ],
  sendCredentials: [
    `mutation($credentials: [JSON!]!) {
      onboarding: onboardingEnterCredentials(
          credentials: $credentials
      ) {
        step
        credentials
        accounts
      }
    }`,
    ({ onboarding }) => onboarding,
  ],
  selectAccount: [
    `mutation($id: String!) {
      onboarding: onboardingSelectAccount(
          accountGuid: $id
      ) {
        step
        account
      }
    }`,
    ({ onboarding }) => onboarding,
  ],
  goBack: [
    `mutation {
      result: onboardingCancel
    }`,
    ({ result }) => result,
  ],
}
