import React from 'react'
import cx from 'classnames'
import {
  Breadcrumbs,
  BreadcrumbsItem,
  FixedHeader,
} from '@frankmoney/components'
import ExternalWidget from 'components/ExternalWidget'
import { injectStyles } from 'utils/styles'

const styles = {
  root: {},
}

const Widgets = ({ classes, className, accountId }) => (
  <div className={cx(classes.root, className)}>
    <FixedHeader>
      <Breadcrumbs>
        <BreadcrumbsItem>Widgets</BreadcrumbsItem>
      </Breadcrumbs>
    </FixedHeader>
    <ExternalWidget widgetOptions={{ accountId }} />
  </div>
)

export default injectStyles(styles)(Widgets)
