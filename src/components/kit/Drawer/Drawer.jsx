// @flow
import * as React from 'react'
import cx from 'classnames'
import Modal, { type ModalProps } from 'components/kit/Modal'
import Button from 'components/kit/Button'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import DrawerPaper from './DrawerPaper'
import DrawerFooter from './DrawerFooter'
import DrawerSubtitle from './DrawerSubtitle'
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
  modalProps?: $Diff<ModalProps, InheritedModalProps>, // not used?
  title: string,
  titleClamp?: number,
  titleSmaller?: boolean,
  titleExtraButton?: Element,
  subtitle?: string,
  noCloseButton?: boolean,
  footerButtonLabel?: string,
  footerButtonProps?: React.ElementConfig<typeof Button>,
  footerText?: string | React.Element<any>,
  footerTextSmaller?: boolean,
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
  subtitle,
  noCloseButton,
  footerButtonLabel,
  footerButtonProps,
  footerTextSmaller,
  footerText,
  children,
}: Props) => {
  const buttons = []
  if (titleExtraButton) {
    buttons.push(titleExtraButton)
  }

  if (!noCloseButton) {
    buttons.push(<DrawerCloseButton />)
  }

  let footer
  if (footerButtonLabel || footerButtonProps || footerText) {
    footer = (
      <DrawerFooter text={footerText} textSmaller={footerTextSmaller}>
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
          {subtitle && <DrawerSubtitle>{subtitle}</DrawerSubtitle>}
          {children}
          {footer}
        </DrawerContext.Provider>
      </DrawerPaper>
    </Modal>
  )
}

export default injectStyles(styles)(Drawer)
