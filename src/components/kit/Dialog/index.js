// @flow strict-local
import * as React from 'react'
import type { StyledComponent } from 'utils/styles'
import Dialog from './Dialog'
import DialogTitle from './DialogTitle'
import DialogPaper from './DialogPaper'
import DialogMessage from './DialogMessage'
import DialogField from './DialogField'
import DialogButtons from './DialogButtons'
import DialogState from './DialogState'

type DialogComponents = {|
  (): (props: Object) => React.Node, // flowlint-line unclear-type:off
  Title: StyledComponent,
  Paper: StyledComponent,
  Message: StyledComponent,
  Buttons: StyledComponent,
  State: StyledComponent,
  Field: StyledComponent,
|}

const DotNotation: any = Dialog // flowlint-line unclear-type:off

DotNotation.Title = DialogTitle
DotNotation.Paper = DialogPaper
DotNotation.Message = DialogMessage
DotNotation.Buttons = DialogButtons
DotNotation.State = DialogState
DotNotation.Field = DialogField

export { default as ConfirmDialog } from './ConfirmDialog'
export default (DotNotation: DialogComponents)
