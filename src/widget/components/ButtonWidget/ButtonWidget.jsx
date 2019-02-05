// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { withState, compose, defaultProps } from 'recompose'
import { type AccountId } from 'data/models/account'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import BodyFixer from 'widget/components/utility/BodyFixer'
import BodyPreventScrolling from 'widget/components/utility/BodyPreventScrolling'
import calcScreenSize from 'widget/components/utility/calcScreenSize'
import { type WidgetWidth } from 'components/widgets/Tabs/OverviewTab'
import ButtonWidgetEmbed from './ButtonWidgetEmbed'
import ButtonWidgetToggle from './ButtonWidgetToggle'
import { BUTTON_HEIGHT } from './constants'
import styles from './ButtonWidget.jss'

const MAX_FRAME_HEIGHT = 667

type Props = {|
  ...InjectStylesProps,
  //
  accountId?: AccountId,
  buttonColor?: string,
  changeOpen: boolean => void,
  mobile?: boolean,
  open: boolean,
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
    // lazy load widget component
    wasOpened: this.props.open,
  }

  componentDidMount() {
    if (this.props.openImmediately) {
      setTimeout(() => {
        this.props.changeOpen(true)
      }, this.props.openImmediatelyTimeout)
    }
  }

  componentWillReceiveProps(newProps) {
    if (!this.state.wasOpened && newProps.open) {
      this.setState({ wasOpened: true })
    }
  }

  handleButtonClick = () => {
    this.props.changeOpen(!this.props.open)
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

  render() {
    const {
      classes,
      mobile,
      buttonColor,
      accountId,
      open,
      screenWidth,
      width,
    } = this.props
    const { wasOpened, hover } = this.state

    const actualWidth = mobile ? screenWidth : width

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
          color={buttonColor}
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
    zIndex: 1000000,
    defaultOpen: false,
  }),
  withState('open', 'changeOpen', props => props.defaultOpen),
  calcScreenSize({ debounce: 100 }),
  injectStyles(styles)
)(ButtonWidget)
