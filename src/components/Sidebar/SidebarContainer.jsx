// @flow
/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as React from 'react'
import Fade from 'material-ui/transitions/Fade'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import SidebarPanel from './SidebarPanel'
import styles, { TOGGLE_DURATION } from './SidebarContainer.jss'

type Props = {|
  ...InjectStylesProps,
  //
  children?: React.Node,
  overlayOn: boolean,
  open: boolean,
  // sidebar panel width
  width: number,
  // eslint-disable-next-line react/no-unused-prop-types
  minContentWidth: number,
  onBackdropClick: Function,
  LogoComponent?: () => Element,
  AccountsSwitchMenuComponent?: () => Element,
  renderGlobalMenuItems?: () => Array<Element>,
  BottomMenuComponent?: () => Element,
|}

class SidebarContainer extends React.Component<Props> {
  static defaultProps = {
    minContentWidth: 1000,
    isFixed: true,
    PanelProps: {},
  }

  render() {
    const {
      classes,
      open,
      overlayOn,
      width,
      children,
      onBackdropClick,
      LogoComponent,
      AccountsSwitchMenuComponent,
      renderGlobalMenuItems,
      BottomMenuComponent,
    } = this.props

    return (
      <>
        <SidebarPanel
          className={classes.panel}
          width={width}
          LogoComponent={LogoComponent}
          AccountsSwitchMenuComponent={AccountsSwitchMenuComponent}
          renderGlobalMenuItems={renderGlobalMenuItems}
          BottomMenuComponent={BottomMenuComponent}
        />
        <Fade
          timeout={TOGGLE_DURATION}
          in={open && overlayOn}
          appear
          mountOnEnter
          unmountOnExit
        >
          <div className={classes.backdrop} onClick={onBackdropClick} />
        </Fade>
        <div className={classes.content}>{children}</div>
      </>
    )
  }
}

export default injectStyles(styles)(SidebarContainer)
