import createActions from 'utils/createActions'

export const ACTION_PREFIX = 'auth/resetPassword'

const actions = createActions(ACTION_PREFIX, {
  load: true,
  leave: false,
})

export default actions
