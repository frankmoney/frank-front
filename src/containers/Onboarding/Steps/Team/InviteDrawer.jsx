import * as R from 'ramda'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { email as validateEmail, required, testObject } from '@frankmoney/forms'
import { compose, withState, withPropsOnChange, withHandlers } from 'recompose'
import TeamInviteDrawer from 'components/TeamInviteDrawer'
import { ROLES } from '../../../../const'
import * as ACTIONS from '../../actions'

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    onSubmit: ACTIONS.submitInvite,
  },
])

const validate = props =>
  testObject(props, {
    email: [validateEmail, required],
    role: [required],
  })

const DEFAULT_ROLE = Array.from(ROLES.keys())[0]

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withState('email', 'onEmailChange'),
  withState('role', 'onRoleChange', DEFAULT_ROLE),
  withState('note', 'onNoteChange'),
  withPropsOnChange(['email', 'role'], props => ({
    invalid: !validate(props),
  })),
  withHandlers({
    onSubmit: ({
      onSubmit,
      email,
      role,
      note,
      onEmailChange,
      onRoleChange,
      onNoteChange,
    }) => () => {
      onSubmit({ email, role, note })
      // reset form data
      onEmailChange('')
      onRoleChange(DEFAULT_ROLE)
      onNoteChange('')
    },
  })
)(TeamInviteDrawer)
