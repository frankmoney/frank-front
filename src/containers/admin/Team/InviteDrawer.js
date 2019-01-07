import { compose } from 'recompose'
import TeamInviteDrawer from 'components/drawers/TeamInviteDrawer'
import reconnect from 'utils/reconnect'
import ACTIONS from './actions'
import { inviteDrawerSubmittingSelector } from './selectors'

export default compose(
  reconnect(
    {
      loading: inviteDrawerSubmittingSelector,
    },
    {
      onClose: ACTIONS.closeInviteDrawer,
      onSubmit: ACTIONS.invite,
    }
  )
)(TeamInviteDrawer)
