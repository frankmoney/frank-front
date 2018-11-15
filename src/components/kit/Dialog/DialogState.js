// @flow strict-local
import { toRenderProps, withState } from 'recompose'

const DialogState = toRenderProps(withState('open', 'toggle', false))

export default DialogState
