import { toRenderProps, withState } from 'recompose'

const DrawerState = toRenderProps(withState('open', 'toggle', false))

export default DrawerState
