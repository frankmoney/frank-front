import * as R from 'ramda'

const team = [
  `
  query {
    accounts {
      id
      name
    }
  
    team {
      id
      name
      
      members {
        id
        self
        email
        lastName
        firstName
        avatar
        role
        acl {
          remove
          editRole
          editAvatar
          editProfile
          editPassword
        }
      }
    }
  }
  `,
  ({ accounts, team: { id, name, members } }) => ({
    team: {
      id,
      name,
      accounts,
    },
    self: R.find(x => x.self, members),
    others: R.filter(x => !x.self, members),
  }),
]

const updateRole = [
  `
  mutation($id: ID!, $role: TeamMemberRole!) {
    teamMemberUpdateRole(id: $id, role: $role) {
      id
      email
      lastName
      firstName
      role
      acl {
        remove
        editRole
        editAvatar
        editProfile
        editPassword
      }
    }
  }
  `,
  R.prop('teamMemberUpdateRole'),
]

export default {
  team,
  updateRole,
}
