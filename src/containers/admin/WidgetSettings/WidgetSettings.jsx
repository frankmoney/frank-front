import React from 'react'
import { compose } from 'recompose'
import { withTheme } from 'utils/styles'
import ExternalWidget from 'components/ExternalWidget'
import reconnect from 'utils/reconnect'
import WidgetSettingsHeader from './WidgetSettingsHeader'
import * as SELECTORS from './selectors'
import * as ACTIONS from './actions'

const WidgetSettings = ({
  className,
  scriptSrc,
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
  <div className={className}>
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
    <ExternalWidget
      scriptSrc={scriptSrc}
      // widget should be behind sidebar
      widgetOptions={{
        accountId,
        position,
        buttonColor: color,
        zIndex: theme.zIndex.sidebar - 1,
      }}
    />
  </div>
)

export default compose(
  reconnect(
    {
      accountId: SELECTORS.accountId,
      position: SELECTORS.position,
      size: SELECTORS.size,
      color: SELECTORS.color,
      widgetType: SELECTORS.widgetType,
      scriptSrc: SELECTORS.scriptSrc,
      codeText: SELECTORS.widgetCodeText,
    },
    {
      changePosition: ACTIONS.changePosition,
      changeWidgetType: ACTIONS.changeType,
      changeSize: ACTIONS.changeSize,
      changeColor: ACTIONS.changeColor,
    }
  ),
  withTheme
)(WidgetSettings)
