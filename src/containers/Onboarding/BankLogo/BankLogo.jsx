import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import DefaultImage from 'components/DefaultImage'
import emptyLogoUrl from './bank_no_logo.png'

const styles = {
  root: {
    borderRadius: 8,
    overflow: 'hidden',
    width: 50,
    height: 50,
  },
}

const BankLogo = ({ src, className, classes, ...props }) => (
  <DefaultImage
    className={cx(classes.root, className)}
    src={src || emptyLogoUrl}
    defaultSrc={emptyLogoUrl}
    {...props}
  />
)

export default injectStyles(styles)(BankLogo)
