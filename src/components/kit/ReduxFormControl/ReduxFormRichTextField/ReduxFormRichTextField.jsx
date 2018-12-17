import React from 'react'
import { EditorState, SelectionState } from 'draft-js'
import { Field } from 'redux-form/immutable'
import { compose, withPropsOnChange, mapProps } from 'recompose'
import EditorComponent from './RichTextInput'

const createState = props => {
  const value = props.value
  const editorState = value
    ? EditorState.createWithContent(value)
    : EditorState.createEmpty()

  return {
    editorState,
  }
}

// Редактор хранит весь стейт локально кроме currentContent{blockMap, entityMap}
// который отправляет как стейт поля формы и мерджит на входе с локальным стейтом, который хранит селекшен
class FormEditor extends React.Component {
  state = createState(this.props)

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      const newContentState = nextProps.value
      // получаем на вход ContentState и подменяем селекшен из локального стейта
      // иначе после реинициализации формы приходит ТОТ ЖЕ контент но с другим селекшеном и deepEqual говорит что поле dirty по-прежнему
      const mergedContentState = newContentState
        .set(
          'selectionBefore',
          this.state.editorState.getCurrentContent().getSelectionBefore()
        )
        .set(
          'selectionAfter',
          this.state.editorState.getCurrentContent().getSelectionAfter()
        )

      const newEditorState = EditorState.set(this.state.editorState, {
        currentContent: mergedContentState,
      })

      this.handleChange(newEditorState)
    }

    if (this.props.focus) {
      this.editor.focus()
    }
  }

  handleChange = newEditorState => {
    this.setState(
      {
        editorState: newEditorState,
      },
      () => {
        this.props.onChange(newEditorState)
      }
    )
  }

  handleBlur = () => {
    console.log('BLUR')
    const selection = this.state.editorState.getSelection()
    const newEditorState = EditorState.acceptSelection(
      this.state.editorState,
      selection.merge({
        focusOffset: selection.getAnchorOffset(),
      })
    )
    this.props.onBlur(newEditorState)
  }

  handleFocus = () => {
    console.log('FOCUS')

    this.props.onFocus()
  }

  handleEditorRef = editor => {
    console.log('ref', editor)
    if (editor) {
      this.editor = editor
    }
  }

  render() {
    const { editorState } = this.state
    const { value, onChange, onBlur, onFocus, ...otherInputProps } = this.props

    console.log('props', this.props)

    // const contentState = editorState.getCurrentContent()
    // const hasText = editorState && contentState.hasText()

    return (
      <EditorComponent
        ref={this.handleEditorRef}
        // fallback for wrapped Editor component instances
        editorRef={this.handleEditorRef}
        editorState={editorState}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        {...otherInputProps}
      />
    )
  }
}

const parse = editorState => {
  console.log('parse', editorState)
  const contentState = editorState.getCurrentContent()
  const selection = SelectionState.createEmpty(
    contentState.getFirstBlock().getKey()
  )
  return contentState.merge({
    selectionBefore: selection,
    selectionAfter: selection,
  })
}
/*
const FormRedactorField = ({ ...props }) => (
  <Field parse={parse} component={FormEditor} {...props} />
)
*/

const propsMapper = mapProps(props => {
  const {
    input: { value, onChange, onFocus, onBlur, ...otherInputProps },
    meta: { active },
    counter,
    ...otherProps
  } = props

  return {
    value,
    onChange,
    onFocus,
    onBlur,
    focus: active,
    inputComponent: FormEditor,
    // error: mapError(props),
    // hint: mapHelperText(props),
    ...otherInputProps,
    ...otherProps,
  }
})

const FormRedactorField = compose(
  withPropsOnChange(['component'], ({ component: Component }) => ({
    parse,
    component: propsMapper(Component),
  }))
)(Field)

export default FormRedactorField
