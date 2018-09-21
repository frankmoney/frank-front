import { Field } from 'redux-form/immutable'
import { withProps, mapProps } from 'recompose'
import OptionsList from '../OptionsList'

const OptionsField = withProps({
  component: mapProps(({ input, ...props }) => ({ ...input, ...props }))(
    OptionsList
  ),
})(Field)

export default OptionsField
