import React from 'react'
import cx from 'classnames'
import { FixedHeader, SidebarToggleButton } from '@frankmoney/components'
import Tabs from 'components/Tabs'
import { injectStyles } from 'utils/styles'
import GetCodeButton from './GetCodeButton'
import WidgetPosition from './WidgetPosition'
import WidgetColor from './WidgetColor'
import WidgetSize from './WidgetSize'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  sidebarMenu: {
    marginRight: 22,
  },
  tabs: {
    marginTop: 26,
  },
  left: {
    display: 'flex',
    alignItems: 'inherit',
  },
  right: {
    display: 'flex',
    alignItems: 'inherit',
  },
  position: {
    marginLeft: 30,
  },
  codeButton: {
    marginLeft: 30,
  },
}

const WidgetSettingsHeader = ({
  classes,
  className,
  position,
  onChangePosition,
  size,
  onChangeSize,
  color,
  onChangeColor,
  codeText,
  currentTab,
  onChangeTab,
}) => (
  <FixedHeader
    alwaysScrolled
    className={cx(classes.root, 'ui-fixed', className)}
  >
    <div className={classes.left}>
      <SidebarToggleButton className={classes.sidebarMenu} />
      <Tabs value={currentTab} onChange={onChangeTab} className={classes.tabs}>
        <Tabs.Item key="button" value="button" label="Button" />
        <Tabs.Item key="inline" value="inline" label="Inline" />
      </Tabs>
    </div>
    <div className={classes.right}>
      {currentTab === 'button' && (
        <WidgetColor color={color} onChange={onChangeColor} />
      )}
      {currentTab === 'button' && (
        <WidgetPosition
          className={classes.position}
          position={position}
          onChange={onChangePosition}
        />
      )}
      {currentTab === 'inline' && (
        <WidgetSize
          key={`${size.width}x${size.height}`}
          initialWidth={size.width}
          initialHeight={size.height}
          onChange={onChangeSize}
        />
      )}
      <GetCodeButton className={classes.codeButton} codeText={codeText} />
    </div>
  </FixedHeader>
)

export default injectStyles(styles)(WidgetSettingsHeader)
