import { Field } from 'redux-form/immutable'
import { withProps, mapProps } from 'recompose'
import ImageOptionsList from '../ImageOptionsList'

const OptionsField = withProps({
  component: mapProps(({ input, ...props }) => ({ ...input, ...props }))(
    ImageOptionsList
  ),
})(Field)

export default OptionsField
