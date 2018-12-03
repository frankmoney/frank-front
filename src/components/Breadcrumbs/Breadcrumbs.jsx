// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { Breadcrumbs as DefaultBreadcrumbs } from '@frankmoney/components'
import { injectStyles } from 'utils/styles'
import Separator from './Separator'

const styles = {
  root: {
    marginTop: 0,
  },
}

const Breadcrumbs = ({ classes, className, ...props }) => (
  <DefaultBreadcrumbs
    className={cx(classes.root, className)}
    separatorComponent={Separator}
    {...props}
  />
)

export default injectStyles(styles)(Breadcrumbs)
