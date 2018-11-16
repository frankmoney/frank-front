// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import ArrowPaper from 'components/kit/ArrowPaper'
import Popup, {
  type PopupAlign,
  type PopupPosition,
} from 'components/kit/PopupBase'
import createPortalInBody from 'utils/dom/createPortal'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = {
  paper: {
    padding: 29,
  },
}

const Portal = ({ children }) => createPortalInBody(children)

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
  button: AnchorButton,
  children,
  classes,
  className,
  place,
}: Props) => (
  <Popup place={place} align={align} distance={15}>
    {({ open, toggle, getAnchorProps, getPopupProps }) => (
      <>
        {React.cloneElement(AnchorButton, {
          on: open,
          onClick: toggle,
          ...getAnchorProps(),
        })}
        {open && (
          <Portal>
            <ArrowPaper
              {...getPopupProps()}
              className={cx(classes.paper, className)}
              direction={REVERSE_DIRECTION[place]}
              align={align}
            >
              {children}
            </ArrowPaper>
          </Portal>
        )}
      </>
    )}
  </Popup>
)

export default injectStyles(styles)(ArrowPopup)
