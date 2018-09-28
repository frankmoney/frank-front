import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { ConfirmDialog } from '@frankmoney/components'

const omitDisabled = R.omit('&$disabled')
const styles = theme => ({
  messageFade: {
    color: 'rgba(0, 0, 0, 0.3)',
  },
  buttonNegative: omitDisabled(theme.Button.negative),
  buttonPositive: omitDisabled(theme.Button.primary),
  buttonDanger: omitDisabled(theme.Button.danger),
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
