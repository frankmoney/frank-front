import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { ConfirmDialog } from '@frankmoney/components'

const styles = theme => ({
  messageFade: {
    color: 'rgba(0, 0, 0, 0.3)',
  },
  buttonNegative: { ...theme.Button.negative },
  buttonPositive: { ...theme.Button.primary },
  buttonDanger: { ...theme.Button.danger },
})

const StoryConfirmDialog = ({
  classes,
  title,
  confirmLabel,
  confirmButtonProps: otherConfirmButtonProps,
  onConfirmClick,
  onRequestClose,
  type,
  ...dialogProps
}) => {
  const confirmButtonProps = {
    ...otherConfirmButtonProps,
    className: cx(
      otherConfirmButtonProps.type === 'negative' && classes.buttonNegative,
      otherConfirmButtonProps.type === 'positive' && classes.buttonPositive,
      otherConfirmButtonProps.type === 'danger' && classes.buttonDanger
    ),
  }

  return (
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
}

export default injectStyles(styles)(StoryConfirmDialog)
