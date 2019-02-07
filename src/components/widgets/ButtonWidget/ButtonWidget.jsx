// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { compose, defaultProps } from 'recompose'
import { type AccountId } from 'data/models/account'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import BodyFixer from 'components/widgets/utility/BodyFixer'
import BodyPreventScrolling from 'components/widgets/utility/BodyPreventScrolling'
import calcScreenSize from 'components/widgets/utility/calcScreenSize'
import { type WidgetWidth } from 'components/widgets/Tabs/OverviewTab'
import ButtonWidgetEmbed from './ButtonWidgetEmbed'
import ButtonWidgetToggle from './ButtonWidgetToggle'
import { BUTTON_HEIGHT } from './constants'
import styles from './ButtonWidget.jss'

const MAX_FRAME_HEIGHT = 667

type ButtonWidgetColor = 'blue' | 'dark' | string

const mapWidgetColor = color => {
  const MAP = {
    dark: '#252B43',
    blue: '#4C51F3',
  }

  return MAP[color] || color
}

const mapWidgetHoverColor = color => {
  const MAP = {
    dark: 'rgb(48,54,76)',
    blue: 'rgb(68,73,219)',
  }

  return MAP[color] || color
}

type Props = {|
  ...InjectStylesProps,
  //
  accountId?: AccountId,
  buttonColor?: ButtonWidgetColor,
  buttonHoverColor?: ButtonWidgetColor,
  onChangeOpen?: boolean => void,
  mobile?: boolean,
  open?: boolean,
  openImmediately?: boolean,
  openImmediatelyTimeout: number,
  screenWidth: number,
  width: WidgetWidth,
|}

type State = {|
  hover: boolean,
  wasOpened: boolean,
|}

class ButtonWidget extends React.Component<Props, State> {
  state = {
    hover: false,
    open: false,
    // lazy load widget component
    wasOpened: this.props.open,
  }

  get isControlledOpen() {
    return typeof this.props.open !== 'undefined'
  }

  get open() {
    return this.isControlledOpen ? this.props.open : this.state.open
  }

  componentDidMount() {
    if (this.props.openImmediately) {
      setTimeout(() => {
        this.handleChangeOpen(true)
      }, this.props.openImmediatelyTimeout)
    }
  }

  componentWillReceiveProps(newProps) {
    if (!this.state.wasOpened && newProps.open) {
      this.setState({ wasOpened: true })
    }
  }

  handleButtonClick = () => {
    this.handleChangeOpen(!this.open)
  }

  handleMouseEnter = () => {
    if (!this.state.hover) {
      this.setState({ hover: true })
    }
  }

  handleMouseLeave = () => {
    if (this.state.hover) {
      this.setState({ hover: false })
    }
  }

  handleChangeOpen = open => {
    if (this.isControlledOpen) {
      if (typeof this.props.onChangeOpen === 'function') {
        this.props.onChangeOpen(open)
      }
    } else if (this.state.open !== open) {
      const wasOpened = this.state.wasOpened || open
      this.setState({ open, wasOpened }, () => {
        if (typeof this.props.onChangeOpen === 'function') {
          this.props.onChangeOpen(this.state.open)
        }
      })
    }
  }

  render() {
    const {
      classes,
      mobile,
      buttonColor,
      buttonHoverColor,
      accountId,
      open: openProp,
      screenWidth,
      width,
    } = this.props
    const { wasOpened, hover } = this.state

    const actualWidth = mobile ? screenWidth : width
    const open = this.open

    return (
      <div
        className={cx(classes.root, {
          [classes.mobile]: mobile,
          [classes.open]: open,
        })}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {mobile && open && <BodyFixer />}
        {!mobile && hover && <BodyPreventScrolling />}
        {wasOpened && (
          <div className={classes.popup}>
            <ButtonWidgetEmbed
              width={actualWidth}
              accountId={accountId}
              className={classes.popupContent}
            />
          </div>
        )}
        <ButtonWidgetToggle
          className={classes.expander}
          title={open ? 'Real-time report' : 'We’re transparent'}
          open={open}
          color={mapWidgetColor(buttonColor)}
          colorHover={buttonHoverColor || mapWidgetHoverColor(buttonColor)}
          subtitle={
            open ? (
              <>
                Verified by <strong>Frank</strong>
              </>
            ) : (
              <>
                See <strong>real-time</strong> report
              </>
            )
          }
          onClick={this.handleButtonClick}
        />
      </div>
    )
  }
}

export default compose(
  defaultProps({
    position: 'right',
    mobile: false,
    accountId: null,
    openImmediately: false,
    openImmediatelyTimeout: 700,
    verticalOffset: 20,
    horizontalOffset: 20,
    maxHeight: MAX_FRAME_HEIGHT + BUTTON_HEIGHT,
    shrinkWidth: 215,
    width: 375,
    buttonColor: 'dark',
    zIndex: 1000000,
  }),
  calcScreenSize({ debounce: 100 }),
  injectStyles(styles)
)(ButtonWidget)
