import createActions from 'utils/createActions'

export const ACTION_PREFIX = 'auth/signIn'

const actions = createActions(ACTION_PREFIX, {
  load: false,
  leave: false,
  signIn: true,
})

export default actions
