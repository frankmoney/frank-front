import createActions from 'utils/createActions'

export const ACTION_PREFIX = 'auth/recoverPassword'

const actions = createActions(ACTION_PREFIX, {
  load: false,
  leave: false,
  submit: true,
})

export default actions
