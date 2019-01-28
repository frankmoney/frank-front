import React from 'react'
import cx from 'classnames'
import { BreadcrumbsItem, FixedHeader } from '@frankmoney/components'
import Breadcrumbs from 'components/Breadcrumbs'
import { injectStyles } from 'utils/styles'
import GetCodeButton from './GetCodeButton'
import WidgetPosition from './WidgetPosition'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
  },
  position: {
    marginRight: 30,
  },
}

const WidgetSettingsHeader = ({
  classes,
  className,
  position,
  onChangePosition,
  codeText,
}) => (
  <FixedHeader
    alwaysScrolled
    className={cx(classes.root, 'ui-fixed', className)}
  >
    <Breadcrumbs>
      <BreadcrumbsItem>Widgets</BreadcrumbsItem>
    </Breadcrumbs>
    <div className={classes.right}>
      <WidgetPosition
        className={classes.position}
        position={position}
        onChange={onChangePosition}
      />
      <GetCodeButton codeText={codeText} />
    </div>
  </FixedHeader>
)

export default injectStyles(styles)(WidgetSettingsHeader)
