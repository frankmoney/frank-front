import React from 'react'
import cx from 'classnames'
import { compose, lifecycle } from 'recompose'
import { withTheme, injectStyles } from 'utils/styles'
import InlineWidget from 'components/widgets/InlineWidget'
import reconnect from 'utils/reconnect'
import SidebarButtonWidget from './SidebarButtonWidget'
import WidgetSettingsHeader from './WidgetSettingsHeader'
import * as SELECTORS from './selectors'
import * as ACTIONS from './actions'

const styles = theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    ...theme.fontMedium(100),
    textAlign: 'center',
    color: 'rgba(0,0,0,0.07)',
    userSelect: 'none',
  },
})

const WidgetSettings = ({
  classes,
  className,
  accountId,
  position,
  codeText,
  changePosition,
  widgetType,
  size,
  changeSize,
  color,
  changeColor,
  changeWidgetType,
  theme,
}) => (
  <div className={cx(classes.root, className)}>
    <WidgetSettingsHeader
      position={position}
      onChangePosition={changePosition}
      codeText={codeText}
      currentTab={widgetType}
      onChangeTab={changeWidgetType}
      size={size}
      onChangeSize={changeSize}
      color={color}
      onChangeColor={changeColor}
    />
    {widgetType === 'button' && (
      <div className={classes.placeholder}>Your Website</div>
    )}
    {widgetType === 'button' && (
      <SidebarButtonWidget
        {...{
          accountId,
          position,
          buttonColor: color,
          // widget should be behind sidebar
          zIndex: theme.zIndex.sidebar - 1,
        }}
      />
    )}
    {widgetType === 'inline' && (
      <InlineWidget
        accountId={accountId}
        width={size.width}
        height={size.height}
      />
    )}
  </div>
)

export default compose(
  injectStyles(styles),
  withTheme,
  reconnect(
    {
      accountId: SELECTORS.accountId,
      position: SELECTORS.position,
      size: SELECTORS.size,
      color: SELECTORS.color,
      widgetType: SELECTORS.widgetType,
      codeText: SELECTORS.widgetCodeText,
    },
    {
      changePosition: ACTIONS.changePosition,
      changeWidgetType: ACTIONS.changeType,
      changeSize: ACTIONS.changeSize,
      changeColor: ACTIONS.changeColor,
      leave: ACTIONS.leave,
    }
  ),
  lifecycle({
    componentWillUnmount() {
      this.props.leave()
    },
  })
)(WidgetSettings)
