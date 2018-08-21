import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import { ConfirmDialog } from '@frankmoney/components'

const styles = {
  messageFade: {
    color: 'rgba(0, 0, 0, 0.3)',
  },
}

const StoryDeleteConfirmDialog = ({
  classes,
  onDeleteClick,
  onCloseClick,
  ...dialogProps
}) => (
  <ConfirmDialog
    title="Delete draft?"
    confirmLabel="Delete"
    cancelLabel="Cancel"
    onConfirm={onDeleteClick}
    onCancel={onCloseClick}
    danger
    reverseButtons
    {...dialogProps}
  />
)

export default injectStyles(styles)(StoryDeleteConfirmDialog)
