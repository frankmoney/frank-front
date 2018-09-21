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
  confirmButtonProps,
  onConfirmClick,
  onRequestClose,
  ...dialogProps
}) => (
  <ConfirmDialog
    title={title}
    confirmLabel={confirmLabel}
    confirmButtonProps={confirmButtonProps}
    cancelLabel="Cancel"
    onConfirm={onConfirmClick}
    onRequestClose={onRequestClose}
    reverseButtons
    {...dialogProps}
  />
)

export default injectStyles(styles)(StoryConfirmDialog)
