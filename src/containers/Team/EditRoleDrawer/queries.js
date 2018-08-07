import * as R from 'ramda'

const teamAccounts = [
  `
  query {
    result: teamAccounts {
      id
      name
    }
  }
  `,
  R.prop('result'),
]

const teammate = [
  `
  query($id: ID!) {
    result: teammate(id: $id) {
      id
      lastName
      firstName
      admin
      canInvite
      accountIds
    }
  }
  `,
  R.prop('result'),
]

const editRole = [
  `
  mutation(
    $id: ID!,
    $admin: Boolean!,
    $canInvite: Boolean!,
    $accountIds: [ID!]!
  ) {
    result: editTeamMemberRole(
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
  R.prop('result'),
]

export default {
  teamAccounts,
  teammate,
  editRole,
}
