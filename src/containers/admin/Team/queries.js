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

export default {
  team,
  changeAvatar,
  changePassword,
}
