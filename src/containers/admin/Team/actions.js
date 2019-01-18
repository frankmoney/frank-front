import createActions from 'utils/createActions'
import { ACTION_PREFIX } from './constants'

const actions = createActions(ACTION_PREFIX, {
  load: true,
  leave: false,
  acknowledgeInvite: false,
  acceptInvite: true,
  rejectInvite: false,
  openInviteDrawer: false,
  closeInviteDrawer: false,
  openChangePasswordPopup: false,
  hideChangePasswordSnack: false,
  invite: true,
  remove: true,
  changePassword: true,
})

export default actions
