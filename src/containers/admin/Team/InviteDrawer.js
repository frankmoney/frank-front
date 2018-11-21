import { email as validateEmail, required, testObject } from '@frankmoney/forms'
import { compose, withState, withPropsOnChange } from 'recompose'
import TeamInviteDrawer from 'components/drawers/TeamInviteDrawer'
import reconnect from 'utils/reconnect'
import ACTIONS from './actions'

const validate = props =>
  testObject(props, {
    email: [validateEmail, required],
    role: [required],
  })

export default compose(
  reconnect(null, {
    onClose: ACTIONS.closeInviteDrawer,
    onSubmit: ACTIONS.invite,
  }),
  withState('email', 'onEmailChange'),
  withState('role', 'onRoleChange', 'observer'),
  withState('note', 'onNoteChange'),
  withPropsOnChange(['email', 'role'], props => ({
    invalid: !validate(props),
  }))
)(TeamInviteDrawer)
