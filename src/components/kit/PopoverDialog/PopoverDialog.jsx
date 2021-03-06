// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import ArrowPopup from 'components/ArrowPopup'
import chainCallbacks from 'utils/dom/chainCallbacks'
import PopoverDialogButton from './PopoverDialogButton'
import PopoverDialogButtons from './PopoverDialogButtons'

const styles = {
  root: {
    padding: 30,
    width: props => props.width,
  },
  button: {},
  body: {
    marginBottom: 30,
  },
}

const PopoverDialog = ({
  align,
  button,
  cancelButtonProps,
  cancelLabel,
  children,
  classes,
  className,
  confirmButtonProps,
  confirmLabel,
  danger,
  disableCloseOnConfirm,
  onConfirm,
  onClose,
  place,
}) => (
  <ArrowPopup
    className={cx(classes.root, className)}
    place={place}
    align={align}
    button={button}
    onClose={onClose}
  >
    {({ closePopup }) => (
      <>
        <div className={classes.body}>{children}</div>
        <PopoverDialogButtons>
          <PopoverDialogButton
            color="gray"
            onClick={closePopup}
            label={cancelLabel}
            {...cancelButtonProps}
          />
          <PopoverDialogButton
            color={danger ? 'red' : 'green'}
            onClick={chainCallbacks(
              onConfirm,
              !disableCloseOnConfirm && closePopup
            )}
            label={confirmLabel}
            {...confirmButtonProps}
          />
        </PopoverDialogButtons>
      </>
    )}
  </ArrowPopup>
)

PopoverDialog.defaultProps = {
  cancelLabel: 'Cancel',
  confirmLabel: 'Done',
  width: 'auto',
}

export default injectStyles(styles)(PopoverDialog)
