import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import styles from './SidebarPanel.jss'

type Props = {
  LogoComponent?: () => Element,
  AccountsSwitchMenuComponent?: () => Element,
  BottomMenuComponent?: () => Element,
  renderGlobalMenuItems?: () => Array<Element>,
}

const Nothing = () => null

class SidebarPanel extends React.Component<Props, void> {
  state = {
    isMenuOverflow: false,
  }

  componentDidMount() {
    this.calcMenuOverflow()
  }

  componentDidUpdate() {
    this.calcMenuOverflow()
  }

  handleMenuRef = menuEl => {
    this._menuEl = menuEl
  }

  handleMenuContentRef = menuContentEl => {
    this._menuContentEl = menuContentEl
  }

  calcMenuOverflow() {
    const hasOverflow =
      this._menuEl.clientHeight < this._menuContentEl.clientHeight
    if (hasOverflow !== this.state.isMenuOverflow) {
      this.setState({ isMenuOverflow: hasOverflow })
    }
  }

  render() {
    const {
      classes,
      className,
      LogoComponent: Logo,
      AccountsSwitchMenuComponent: AccountsSwitchMenu,
      BottomMenuComponent: BottomMenu,
      renderGlobalMenuItems,
      delimiter,
    } = this.props

    const globalMenuItems = renderGlobalMenuItems()

    return (
      <div
        className={cx(
          classes.root,
          { [classes.hasDelimiter]: delimiter },
          className
        )}
      >
        <Logo className={classes.logo} />
        <div className={classes.menuWrap}>
          <div className={classes.menuGroupWrapper} ref={this.handleMenuRef}>
            <div className={classes.menuGroupContentWrap}>
              <div
                className={classes.menuGroup}
                ref={this.handleMenuContentRef}
              >
                <AccountsSwitchMenu />
              </div>
            </div>
            {this.state.isMenuOverflow && (
              <div className={classes.overflowGradient} />
            )}
          </div>
          {globalMenuItems &&
            (React.isValidElement(globalMenuItems) ||
              Boolean(globalMenuItems.length)) && (
              <div className={classes.menuGlobal}>{globalMenuItems}</div>
            )}
        </div>
        <BottomMenu className={classes.bottomMenu} />
      </div>
    )
  }
}

SidebarPanel.defaultProps = {
  renderGlobalMenuItems: () => [],
  LogoComponent: Nothing,
  AccountsSwitchMenuComponent: Nothing,
  BottomMenuComponent: Nothing,
}

export default injectStyles(styles)(SidebarPanel)
