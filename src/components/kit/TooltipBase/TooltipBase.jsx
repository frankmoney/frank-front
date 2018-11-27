// @flow
import * as React from 'react'
import PopupBase, {
  type PopupAlign,
  type PopupPosition,
} from 'components/kit/PopupBase'
import chainCallbacks from 'utils/dom/chainCallbacks'

export type TooltipBaseProps = {|
  align: PopupAlign,
  appearTimeout?: number,
  closeTimeout?: number,
  defaultOpen?: boolean,
  defaultVisible?: boolean,
  place: PopupPosition,
  popupAccessible?: boolean,
|}

type Props = {|
  ...TooltipBaseProps,
  //
  children: React.StatelessFunctionalComponent<any>,
  open?: boolean,
|}

type State = {|
  visible: boolean,
|}

type TimeoutID = any // FIXME: upgrade eslint-plugin-flowtype

class TooltipBase extends React.Component<Props, State> {
  static defaultProps = {
    defaultVisible: false,
    closeTimeout: 200,
    appearTimeout: 0,
    popupAccessible: false,
  }

  state = {
    visible: !!this.props.defaultVisible,
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

  outTimeout: TimeoutID

  handleMouseIn = () => {
    clearTimeout(this.outTimeout)
    this.appearTimeout = setTimeout(() => {
      this.setState({ visible: true })
    }, this.props.appearTimeout)
  }

  handleMouseOut = () => {
    clearTimeout(this.appearTimeout)
    this.outTimeout = setTimeout(() => {
      this.setState({ visible: false })
    }, this.props.popupAccessible ? this.props.closeTimeout : 0)
  }

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
