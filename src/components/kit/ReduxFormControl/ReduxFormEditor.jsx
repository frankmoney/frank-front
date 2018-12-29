import React from 'react'
import { Field } from 'redux-form/immutable'
import { EditorState, SelectionState } from 'draft-js'
import Editor from 'components/kit/Editor'

const createState = props => {
  const value = props.input.value
  const editorState = value
    ? EditorState.createWithContent(value)
    : EditorState.createEmpty()

  return {
    editorState,
  }
}

// Редактор хранит весь стейт локально кроме currentContent{blockMap, entityMap}
// который отправляет как стейт поля формы и мерджит на входе с локальным стейтом, который хранит селекшен
class EditorField extends React.Component {
  state = createState(this.props)

  componentWillReceiveProps(nextProps) {
    if (nextProps.input.value !== this.props.input.value) {
      const newContentState = nextProps.input.value
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

    if (nextProps.meta.active && !this.props.meta.active) {
      this.editor.focus()
    }
  }

  handleChange = newEditorState => {
    this.setState(
      {
        editorState: newEditorState,
      },
      () => {
        this.props.input.onChange(newEditorState)
      }
    )
  }

  handleBlur = () => {
    const selection = this.state.editorState.getSelection()
    const newEditorState = EditorState.acceptSelection(
      this.state.editorState,
      selection.merge({
        focusOffset: selection.getAnchorOffset(),
      })
    )
    this.props.input.onBlur(newEditorState)
  }

  handleEditorRef = editor => {
    if (editor) {
      this.editor = editor
    }
  }

  render() {
    const { editorState } = this.state
    const {
      label,
      editorComponent: EditorComponent = Editor,
      counter,
      input: { value, onChange, onBlur, ...otherInputProps },
      ...custom
    } = this.props

    return (
      <EditorComponent
        ref={this.handleEditorRef}
        // fallback for wrapped Editor component instances
        editorRef={this.handleEditorRef}
        editorState={editorState}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        {...custom}
        {...otherInputProps}
      />
    )
  }
}

const parse = editorState => {
  const contentState = editorState.getCurrentContent()
  const selection = SelectionState.createEmpty(
    contentState.getFirstBlock().getKey()
  )
  return contentState.merge({
    selectionBefore: selection,
    selectionAfter: selection,
  })
}

const ReduxFormEditor = ({ component, ...props }) => (
  <Field
    parse={parse}
    component={EditorField}
    editorComponent={component}
    {...props}
  />
)

export default ReduxFormEditor
