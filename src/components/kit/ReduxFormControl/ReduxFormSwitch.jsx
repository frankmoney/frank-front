import { Field } from 'redux-form-actions/immutable'
import { compose, mapProps, withPropsOnChange } from 'recompose'

const propsMapper = mapProps(props => {
  const {
    input: { value, onChange, onFocus, onBlur },
    meta: { active },
    ...otherProps
  } = props

  return {
    checked: value,
    onChange,
    onFocus,
    onBlur,
    focus: active,
    ...otherProps,
  }
})

const ReduxFormSwitch = compose(
  withPropsOnChange(['component'], ({ component: Component }) => ({
    component: propsMapper(Component),
  }))
)(Field)

export default ReduxFormSwitch
