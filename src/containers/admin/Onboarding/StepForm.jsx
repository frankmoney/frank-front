import { compose, withProps } from 'recompose'
import StepForm from 'components/onboarding/StepForm'
import reconnect from 'utils/reconnect'
import * as ACTIONS from './actions'
import { STEP_FORM } from './constants'

export default compose(
  withProps({ form: STEP_FORM }),
  reconnect(null, { onSubmit: ACTIONS.goNext })
)(StepForm)
