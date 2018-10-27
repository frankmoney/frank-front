// @flow
import React from 'react'
import PopupBase from 'components/kit/PopupBase/index'
import chainCallbacks from 'utils/dom/chainCallbacks'

export type Props = {
  defaultVisible?: boolean,
  popupAccessible?: boolean,
  closeTimeout?: number,
}

class TooltipBase extends React.Component<Props> {
  static defaultProps = {
    defaultVisible: false,
    closeTimeout: 200,
    popupAccessible: false,
  }

  state = {
    visible: this.props.defaultVisible,
  }

  handleMouseIn = () => {
    clearTimeout(this.outTimeout)
    this.setState({ visible: true })
  }

  handleMouseOut = () => {
    this.outTimeout = setTimeout(() => {
      this.setState({ visible: false })
    }, this.props.popupAccessible ? this.props.closeTimeout : 0)
  }

  getState = ({
    getAnchorProps,
    getPopupProps,
    anchorEl: targetEl,
    popupEl: tooltipEl,
    ...popupProps
  }) => ({
    getTargetProps: (props = {}) =>
      getAnchorProps({
        ...props,
        onMouseEnter: chainCallbacks(this.handleMouseIn, props.onMouseEnter),
        onMouseLeave: chainCallbacks(this.handleMouseOut, props.onMouseLeave),
      }),
    targetEl,
    tooltipEl,
    getTooltipProps: (props = {}) =>
      getPopupProps({
        ...props,
        onMouseEnter: chainCallbacks(
          this.props.popupAccessible && this.handleMouseIn,
          props.onMouseEnter
        ),
        onMouseLeave: chainCallbacks(
          this.props.popupAccessible && this.handleMouseOut,
          props.onMouseLeave
        ),
      }),
    ...popupProps,
  })

  render() {
    const { children, open, defaultOpen, ...otherProps } = this.props

    return (
      <PopupBase open={this.state.visible} {...otherProps}>
        {popupProps => children(this.getState(popupProps))}
      </PopupBase>
    )
  }
}

export default TooltipBase
