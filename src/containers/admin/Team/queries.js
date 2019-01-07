import * as R from 'ramda'

const team = [
  `
  query {
    accounts {
      id: pid
      name
    }
  
    team {
      id: pid
      name
      invites {
        email
      }
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
  ({ accounts, team: { id, name, members, invites } }) => ({
    team: {
      id,
      name,
      accounts,
    },
    invites,
    self: R.find(x => x.self, members),
    others: R.filter(x => !x.self, members),
  }),
]

const changeAvatar = [
  `
  mutation($avatar: JSON) {
    meChangeAvatar(avatar: $avatar) {
      pid
    }
  }
  `,
  R.prop('meChangeAvatar'),
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

const sendInvite = [
  `
  mutation($teamId: ID!, $email: String!, $note: String) {
    teamMemberInviteCreate(teamPid: $teamId, email: $email, note: $note) {
      email
    }
  }
  `,
  R.prop('teamMemberInviteCreate'),
]

export default {
  team,
  changeAvatar,
  changePassword,
  sendInvite,
}
