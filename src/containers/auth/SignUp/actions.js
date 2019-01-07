import createActions from 'utils/createActions'

export const ACTION_PREFIX = 'auth/signUp'

const actions = createActions(ACTION_PREFIX, {
  submit: true,
})

export default actions
