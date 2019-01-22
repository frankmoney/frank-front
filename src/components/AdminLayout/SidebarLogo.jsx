import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import FrankLogo from './FrankLogo.svg'

const logoStyles = {
  logo: {
    color: '#20284A',
  },
}

const SidebarLogo = injectStyles(logoStyles)(({ classes, className }) => (
  <div className={cx(classes.logo, className)}>
    <FrankLogo />
  </div>
))

export default SidebarLogo
