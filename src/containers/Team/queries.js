import * as R from 'ramda'

export default {
  team: [
    `
    fragment profileFields on TeamResultProfile {
      id
      email
      lastName
      firstName
      avatar
      admin
      canInvite
      accountIds
      acl {
        remove
        editRole
        editAvatar
        editProfile
        editPassword
      }
    }
    
    query {
      result: team {
        team {
          id
          name
          accounts {
            id
            name
          }
        }
        self {
          ...profileFields
        }
        others {
          ...profileFields
        }
      }
    }
    `,
    R.prop('result'),
  ],
}
