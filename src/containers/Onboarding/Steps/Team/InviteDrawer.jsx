import * as R from 'ramda'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { email as validateEmail, required, testObject } from '@frankmoney/forms'
import { compose, withState, withPropsOnChange } from 'recompose'
import TeamInviteDrawer from 'components/TeamInviteDrawer'
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

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withState('email', 'onEmailChange'),
  withState('role', 'onRoleChange', 'observer'),
  withState('note', 'onNoteChange'),
  withPropsOnChange(['email', 'role'], props => ({
    invalid: !validate(props),
  }))
)(TeamInviteDrawer)
