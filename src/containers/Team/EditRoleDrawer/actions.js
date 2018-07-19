import createActions from 'utils/createActions'
import { ACTION_PREFIX } from './constants'

const actions = createActions(ACTION_PREFIX, {
  load: false,
  leave: false,
  cancel: false,
  submit: true,
  change: false,
})

export default actions
