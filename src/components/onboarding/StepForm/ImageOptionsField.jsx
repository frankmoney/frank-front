import { Field } from 'redux-form/immutable'
import { withProps, mapProps } from 'recompose'
import ImageOptionsList from 'components/onboarding/ImageOptionsList'

const OptionsField = withProps({
  component: mapProps(({ input, ...props }) => ({ ...input, ...props }))(
    ImageOptionsList
  ),
})(Field)

export default OptionsField
