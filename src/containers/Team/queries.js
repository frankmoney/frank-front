import * as R from 'ramda'

export default {
  team: [
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
      }
    }
    `,
    ({ accounts, team }) => ({
      team: {
        id: team.id,
        name: team.name,
        accounts,
      },
      self: R.find(x => x.self, team.members),
      others: R.filter(x => !x.self, team.members),
    }),
  ],
}
