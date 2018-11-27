// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import ArrowPaper from 'components/kit/ArrowPaper'
import Popup, {
  type PopupAlign,
  type PopupPosition,
} from 'components/kit/PopupBase'
import Modal from 'components/kit/Modal'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = {
  paper: {
    padding: 29,
  },
}

const REVERSE_DIRECTION: { [PopupPosition]: PopupPosition } = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
}

interface TogglableButton {
  on: boolean;
  onClick: MouseEvent => void;
}

type Props = {|
  ...InjectStylesProps,
  //
  align: PopupAlign,
  button: React.Element<(TogglableButton) => React.Node>,
  children: React.Node,
  place: PopupPosition,
|}

const ArrowPopup = ({
  align = 'center',
  place = 'down',
  button: anchorButton,
  children,
  classes,
  className,
}: Props) => (
  <Popup place={place} align={align} distance={15}>
    {({
      open,
      toggle,
      place: actualPlace,
      toggleClose,
      getAnchorProps,
      getPopupProps,
    }) => {
      const content =
        typeof children === 'function'
          ? children({ closePopup: toggleClose })
          : children

      return (
        <>
          {React.cloneElement(anchorButton, {
            on: open,
            onClick: toggle,
            ...getAnchorProps(),
          })}
          <Modal
            invisibleBackdrop
            fallInsideFocus
            open={open}
            onClose={toggleClose}
          >
            <ArrowPaper
              {...getPopupProps()}
              className={cx(classes.paper, className)}
              direction={REVERSE_DIRECTION[actualPlace]}
              align={align}
            >
              {content}
            </ArrowPaper>
          </Modal>
        </>
      )
    }}
  </Popup>
)

export default injectStyles(styles)(ArrowPopup)
