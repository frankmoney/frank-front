// @flow strict-local
import type { ReactComponent } from 'flow/react'
import Dialog from './Dialog'
import DialogTitle from './DialogTitle'
import DialogPaper from './DialogPaper'
import DialogMessage from './DialogMessage'
import DialogField from './DialogField'
import DialogButtons from './DialogButtons'
import DialogState from './DialogState'

export type { InheritedModalProps } from './Dialog'

type DialogComponents = ReactComponent<typeof Dialog> & {|
  Buttons: ReactComponent<typeof DialogButtons>,
  Field: ReactComponent<typeof DialogField>,
  Message: ReactComponent<typeof DialogMessage>,
  Paper: ReactComponent<typeof DialogPaper>,
  State: ReactComponent<typeof DialogState>,
  Title: ReactComponent<typeof DialogTitle>,
|}

// flowlint-next-line unclear-type:off
const DotNotation: any = Dialog

DotNotation.Title = DialogTitle
DotNotation.Paper = DialogPaper
DotNotation.Message = DialogMessage
DotNotation.Buttons = DialogButtons
DotNotation.State = DialogState
DotNotation.Field = DialogField

export { default as ConfirmDialog } from './ConfirmDialog'
export default (DotNotation: DialogComponents)
