// @flow strict-local
import { compose } from 'recompose'
import reconnect from 'utils/reconnect'
import TeamInviteDrawer from 'components/drawers/TeamInviteDrawer'
import * as ACTIONS from '../../actions'

export default compose(
  reconnect(null, {
    onSubmit: ACTIONS.submitInvite,
  })
)(TeamInviteDrawer)
