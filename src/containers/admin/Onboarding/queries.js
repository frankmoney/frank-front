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
        mfa
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
        institution
        credentials
        accounts
        mfa
      }
    }`,
    ({ onboarding }) => onboarding,
  ],
  sendMfa: [
    `mutation($challenges: [JSON!]!) {
      onboarding: onboardingEnterMfaChallenges(
          challenges: $challenges
      ) {
        step
        institution
        mfa
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
  updateAccountInfo: [
    `mutation($name: String, $description: String) {
      onboarding: onboardingUpdateAccountInfo(
          title: $name
          description: $description
      ) {
        step
        account
      }
    }`,
    ({ onboarding }) => onboarding,
  ],
  completeAccountInfo: [
    `mutation {
      onboarding: onboardingCompleteAccountInfo {
        step
        account
      }
    }`,
    ({ onboarding }) => onboarding,
  ],
  updateCategories: [
    `mutation($categories: [JSON!]!) {
      onboarding: onboardingUpdateCategories(
          categories: $categories
      ) {
        step
        categories
      }
    }`,
    ({ onboarding }) => onboarding,
  ],
  completeCategories: [
    `mutation {
      onboarding: onboardingCompleteCategories {
        step
      }
    }`,
    ({ onboarding }) => onboarding,
  ],
  updateTeam: [
    `mutation($members: [JSON!]!) {
      onboarding: onboardingUpdateTeam(
          members: $members
      ) {
        step
        team
      }
    }`,
    ({ onboarding }) => onboarding,
  ],
  finish: [
    `mutation {
      account: onboardingFinish {
        id: pid
        name
      }
    }`,
    ({ account }) => account,
  ],
  goBack: [
    `mutation {
      result: onboardingBack {
        step
        institution
        credentials
        accounts
        account
        categories
      }
    }`,
    ({ result }) => result,
  ],
  cancel: [
    `mutation {
      result: onboardingCancel
    }`,
    ({ result }) => result,
  ],
}
