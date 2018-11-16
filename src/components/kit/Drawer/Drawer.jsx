// @flow
import * as React from 'react'
import cx from 'classnames'
import Modal, { type ModalProps } from 'components/kit/Modal'
import Button, { type ButtonProps } from 'components/kit/Button'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import DrawerPaper from './DrawerPaper'
import DrawerFooter from './DrawerFooter'
import DrawerTitle from './DrawerTitle'
import DrawerCloseButton from './DrawerCloseButton'
import DrawerContext from './context'

type InheritedModalProps = {|
  open?: boolean,
  onClose?: () => void,
|}

type Props = {|
  ...InjectStylesProps,
  ...InheritedModalProps,
  modalProps: $Diff<ModalProps, InheritedModalProps>,
  title: string,
  titleClamp?: number,
  titleSmaller?: boolean,
  titleExtraButton: Element,
  noCloseButton?: boolean,
  footerButtonLabel?: string,
  footerButtonProps?: ButtonProps,
  footerText?: string,
  children?: React.ChildrenArray<React.Element<any>> | React.Element<any>,
|}

export type DrawerProps = Props

const styles = {
  paper: {
    height: '100%',
    position: 'fixed',
    top: 0,
    right: 0,
    outline: 'none',
  },
}

const Drawer = ({
  classes,
  className,
  open,
  onClose,
  title,
  titleClamp,
  titleSmaller,
  titleExtraButton,
  noCloseButton,
  footerButtonLabel,
  footerButtonProps,
  footerText,
  children,
}: Props) => {
  const buttons = []
  if (!noCloseButton) {
    buttons.push(<DrawerCloseButton />)
  }
  if (titleExtraButton) {
    buttons.push(titleExtraButton)
  }

  let footer
  if (footerButtonLabel || footerButtonProps || footerText) {
    footer = (
      <DrawerFooter text={footerText}>
        <Button
          color="green"
          label={footerButtonLabel}
          {...footerButtonProps}
        />
      </DrawerFooter>
    )
  }

  return (
    <Modal fallInsideFocus open={open} onClose={onClose}>
      <DrawerPaper className={cx(classes.paper, className)}>
        <DrawerContext.Provider value={{ opened: open, close: onClose }}>
          {title && (
            <DrawerTitle
              clamp={titleClamp}
              smaller={titleSmaller}
              buttons={buttons}
            >
              {title}
            </DrawerTitle>
          )}
          {children}
          {footer}
        </DrawerContext.Provider>
      </DrawerPaper>
    </Modal>
  )
}

export default injectStyles(styles)(Drawer)
