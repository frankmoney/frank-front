import * as R from 'ramda'

const team = [
  `
  query {
    accounts {
      pid
      name
    }
  
    team {
      pid
      name
      
      members {
        pid
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
  mutation($pid: ID!, $role: TeamMemberRole!) {
    teamMemberUpdateRole(pid: $pid, role: $role) {
      pid
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

const changePassword = [
  `
  mutation($password: String!) {
    meChangePassword(password: $password) {
      pid
    }
  }
  `,
  R.prop('meChangePassword'),
]

export default {
  team,
  updateRole,
  changePassword,
}
