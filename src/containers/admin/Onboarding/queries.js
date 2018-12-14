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
        spendingCategories
        revenueCategories
        team
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
    `mutation($credentials: [OnboardingCredentials!]!) {
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
    `mutation($challenges: [OnboardingMfaChallenges!]!) {
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
        institution
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
  updateSpendingCategories: [
    `mutation($categories: [OnboardingCategoryCreate!]!) {
      onboarding: onboardingUpdateSpendingCategories(
          categories: $categories
      ) {
        step
        spendingCategories
      }
    }`,
    ({ onboarding }) => onboarding,
  ],
  updateRevenueCategories: [
    `mutation($categories: [OnboardingCategoryCreate!]!) {
      onboarding: onboardingUpdateRevenueCategories(
          categories: $categories
      ) {
        step
        revenueCategories
      }
    }`,
    ({ onboarding }) => onboarding,
  ],
  completeSpendingCategories: [
    `mutation {
      onboarding: onboardingCompleteSpendingCategories {
        step
      }
    }`,
    ({ onboarding }) => onboarding,
  ],
  completeRevenueCategories: [
    `mutation {
      onboarding: onboardingCompleteRevenueCategories {
        step
      }
    }`,
    ({ onboarding }) => onboarding,
  ],
  updateTeam: [
    `mutation($members: [OnboardingMemberCreate!]!) {
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
        spendingCategories
        spendingCategories
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
  getTeam: [
    `query {
      team {
        id: pid
        name
        members {
          id: pid
          email
          firstName
          lastName
          avatar
        }
      }
    }`,
    ({ team }) => team,
  ],
}
