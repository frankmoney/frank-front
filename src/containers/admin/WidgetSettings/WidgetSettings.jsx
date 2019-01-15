import React from 'react'
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
}) => (
  <div className={className}>
    <WidgetSettingsHeader
      position={position}
      onChangePosition={changePosition}
      codeText={codeText}
    />
    <ExternalWidget
      scriptSrc={scriptSrc}
      widgetOptions={{ accountId, position }}
    />
  </div>
)

export default reconnect(
  {
    accountId: SELECTORS.accountId,
    position: SELECTORS.position,
    scriptSrc: SELECTORS.scriptSrc,
    codeText: SELECTORS.widgetCodeText,
  },
  {
    changePosition: ACTIONS.changePosition,
  }
)(WidgetSettings)
