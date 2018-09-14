import * as R from 'ramda'

const accountsAndMember = [
  `
  query($memberId: ID!) {
    accounts {
      id
      name
    }
    
    team {
      member(id: $memberId) {
        id
        lastName
        firstName
        admin
        canInvite
        accountIds
      }
    }
  }
  `,
  ({ accounts, team: { member } }) => ({ accounts, member }),
]

const editRole = [
  `
  mutation(
    $id: ID!,
    $admin: Boolean!,
    $canInvite: Boolean!,
    $accountIds: [ID!]!
  ) {
    teamMemberUpdateRole(
      id: $id,
      admin: $admin,
      canInvite: $canInvite,
      accountIds: $accountIds
    ) {
      id
      lastName
      firstName
      admin
      canInvite
      accountIds
    }
  }
  `,
  R.prop('teamMemberUpdateRole'),
]

export default {
  accountsAndMember,
  editRole,
}
