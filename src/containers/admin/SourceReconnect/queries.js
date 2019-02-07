export default {
  getSource: [
    `query($accountId: ID!, $sourceId: ID!) {
      account(pid: $accountId) {
        accountId: pid
        source(pid: $sourceId) {
          id:pid
          bankName
          bankLogo
          bankUrl:bankLink
        }
      }
      sourceState(sourcePid: $sourceId) {
        status
        credentials
        challenges
      }
    }`,
    ({ account: { accountId, source }, sourceState }) => ({
      accountId,
      ...source,
      ...sourceState,
    }),
  ],
  getSourceState: [
    `query($sourceId: ID!) {
      sourceState(sourcePid: $sourceId) {
        status
        credentials
        challenges
      }
    }`,
    ({ sourceState }) => sourceState,
  ],
  updateSource: [
    `mutation(
      $sourceId: ID!, 
      $credentials: [OnboardingCredentials!], 
      $challenges: [OnboardingMfaChallenges!]
    ) {
      sourceUpdate(
          sourcePid: $sourceId
          credentials: $credentials
          challenges: $challenges
      ) {
        status
        credentials
        challenges
      }
    }`,
    ({ sourceUpdate }) => sourceUpdate,
  ],
}
