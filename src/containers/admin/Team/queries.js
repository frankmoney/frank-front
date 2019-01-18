import * as R from 'ramda'

const team = [
  `
  query {
    team {
      id: pid
      name
      accounts {
        id: pid
        name
      }
      invites {
        email
      }
      members {
        pid
        self
        email
        lastName
        firstName
        color
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
  ({ team: { id, name, accounts, members, invites } }) => ({
    code: null,
    team: {
      id,
      name,
      accounts,
    },
    invite: null,
    invites,
    self: R.find(x => x.self, members),
    others: R.filter(x => !x.self, members),
  }),
]

const maybeAcceptInvite = [
  `
  mutation($token: String!) {
    result: teamMemberInviteMaybeAccept(token: $token) {
      code
      team {
        id: pid
        name
        accounts {
          id: pid
          name
        }
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
      invite {
        creator {
          firstName
        }
        team {
          name
        }
      }
    }
  }
  `,
  ({
    result: {
      code,
      team: { id, name, accounts, members, invites },
      invite,
    },
  }) => ({
    code,
    team: {
      id,
      name,
      accounts,
    },
    invite,
    invites,
    self: R.find(x => x.self, members),
    others: R.filter(x => !x.self, members),
  }),
]

const acceptInvite = [
  `
  mutation($token: String!) {
    result: teamMemberInviteAccept(token: $token) {
      team {
        id: pid
        name
        accounts {
          id: pid
          name
        }
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
  }
  `,
  ({
    result: {
      team: { id, name, accounts, members, invites },
    },
  }) => ({
    code: 'accepted',
    team: {
      id,
      name,
      accounts,
    },
    invite: null,
    invites,
    self: R.find(x => x.self, members),
    others: R.filter(x => !x.self, members),
  }),
]

const changeAvatar = [
  `
  mutation($avatar: JSON) {
    result: meChangeAvatar(avatar: $avatar) {
      pid
      avatar
    }
  }
  `,
  R.prop('result'),
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

const changeTeamName = [
  `
  mutation($name: String!) {
    result: meChangeTeamName(name: $name) {
      name
    }
  }
  `,
  R.prop('result'),
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
  maybeAcceptInvite,
  acceptInvite,
  changeAvatar,
  changePassword,
  changeTeamName,
  sendInvite,
}
