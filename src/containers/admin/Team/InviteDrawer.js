import { compose } from 'recompose'
import TeamInviteDrawer from 'components/drawers/TeamInviteDrawer'
import reconnect from 'utils/reconnect'
import ACTIONS from './actions'

export default compose(
  reconnect(null, {
    onClose: ACTIONS.closeInviteDrawer,
    onSubmit: ACTIONS.invite,
  })
)(TeamInviteDrawer)
