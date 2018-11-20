// @flow strict-local
import React from 'react'
import cx from 'classnames'
import GlobeIcon from 'material-ui-icons/Public'
import { injectStyles } from '@frankmoney/ui'
import { TextButton } from 'components/kit/Button'

const styles = {
  root: {
    display: 'inline-flex',
    textDecoration: 'none',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
    color: 'black', // FIXME
  },
}

// FIXME: this is a placeholder, use future PlainButton
const PublicLinkButton = ({
  classes,
  className,
  iconClassName,
  label,
  labelClassName,
  to,
}) => (
  <a href={to} className={cx(classes.root, className)}>
    <GlobeIcon className={cx(classes.icon, iconClassName)} />
    <TextButton className={labelClassName} label={label} />
  </a>
)

export default injectStyles(styles)(PublicLinkButton)
