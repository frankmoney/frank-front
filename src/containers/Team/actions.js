import createActions from 'utils/createActions'
import { ACTION_PREFIX } from './constants'

const actions = createActions(ACTION_PREFIX, {
  load: true,
  leave: false,
  openInviteDrawer: false,
  closeInviteDrawer: false,
  openChangePasswordPopup: false,
  invite: true,
  remove: true,
  updateRole: true,
})

export default actions
