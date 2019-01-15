import createActions from 'utils/createActions'

export const ACTION_PREFIX = 'auth/acceptInvitation'

const actions = createActions(ACTION_PREFIX, {
  load: true,
  leave: false,
  createUser: true,
})

export default actions
