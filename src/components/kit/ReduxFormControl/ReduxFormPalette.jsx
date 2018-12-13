import { Field } from 'redux-form-actions/immutable'
import {
  compose,
  mapProps,
  defaultProps,
  withPropsOnChange,
  lifecycle,
} from 'recompose'
import PaletteField from 'components/kit/PaletteField'

const propsMapper = compose(
  mapProps(props => {
    const {
      input: { value, onChange, onFocus, onBlur },
      ...otherProps
    } = props

    return {
      value,
      onChange,
      onFocus,
      // onBlur event tries to get value from event target, but Palette is not a HTML input element
      onBlur: () => onBlur(),
      ...otherProps,
    }
  }),
  lifecycle({
    componentDidMount() {
      if (this.props.defaultValue && typeof this.props.value === 'undefined') {
        this.props.onChange(this.props.defaultValue)
      }
    },
  })
)

const ReduxFormSwitch = compose(
  defaultProps({ component: PaletteField }),
  withPropsOnChange(['component'], ({ component: Component }) => ({
    component: propsMapper(Component),
  }))
)(Field)

export default ReduxFormSwitch
