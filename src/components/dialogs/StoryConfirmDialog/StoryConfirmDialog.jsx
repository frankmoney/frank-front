import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import { ConfirmDialog } from '@frankmoney/components'

const styles = {
  messageFade: {
    color: 'rgba(0, 0, 0, 0.3)',
  },
}

const StoryConfirmDialog = ({
  classes,
  title,
  confirmLabel,
  confirmType,
  onConfirmClick,
  onRequestClose,
  ...dialogProps
}) => (
  <ConfirmDialog
    title={title}
    confirmLabel={confirmLabel}
    confirmType={confirmType}
    cancelLabel="Cancel"
    onConfirm={onConfirmClick}
    onRequestClose={onRequestClose}
    reverseButtons
    {...dialogProps}
  />
)

export default injectStyles(styles)(StoryConfirmDialog)
