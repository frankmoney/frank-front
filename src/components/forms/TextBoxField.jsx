import { Field } from 'redux-form/immutable'
import { withProps, mapProps } from 'recompose'
import TextBox from 'components/TextBox'

const TextBoxField = withProps({
  component: mapProps(({ input, ...props }) => ({ ...input, ...props }))(
    TextBox
  ),
})(Field)

export default TextBoxField
