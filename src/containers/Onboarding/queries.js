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
          institutionCode: $credentials
      ) {
        step
        institution
        credentials
        accounts
      }
    }`
  ],
  goBack: [
    `mutation {
      result: onboardingCancel
    }`,
    ({ result }) => result,
  ],
}
