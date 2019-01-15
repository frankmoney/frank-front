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
  theme,
}) => (
  <div className={className}>
    <WidgetSettingsHeader
      position={position}
      onChangePosition={changePosition}
      codeText={codeText}
    />
    <ExternalWidget
      scriptSrc={scriptSrc}
      // widget should be behind sidebar
      widgetOptions={{ accountId, position, zIndex: theme.zIndex.sidebar - 1 }}
    />
  </div>
)

export default compose(
  reconnect(
    {
      accountId: SELECTORS.accountId,
      position: SELECTORS.position,
      scriptSrc: SELECTORS.scriptSrc,
      codeText: SELECTORS.widgetCodeText,
    },
    {
      changePosition: ACTIONS.changePosition,
    }
  ),
  withTheme
)(WidgetSettings)
