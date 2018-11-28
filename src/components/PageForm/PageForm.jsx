// @flow
import React from 'react'
import cx from 'classnames'
import FrankLogo from 'components/Logo'
import { injectStyles } from 'utils/styles'
import resetScrollPositionOnMount from 'utils/resetScrollPositionOnMount'

const styles = theme => ({
  root: {
    minHeight: '100vh',
    position: 'relative',
    paddingTop: 125,
    paddingBottom: 110,
  },
  logo: {
    position: 'absolute',
    width: 100,
    top: 36,
    left: 40,
  },
  title: {
    color: '#252B43',
    ...theme.fontSemibold(60, 60),
    marginBottom: 60,
    textAlign: 'center',
  },
  container: {
    width: 460,
    margin: '0 auto',
  },
  centered: {
    paddingTop: 0,
    paddingBottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const PageForm = ({ classes, className, centered, title, children }) => (
  <div className={cx(classes.root, centered && classes.centered, className)}>
    <FrankLogo className={classes.logo} />
    <div className={classes.container}>
      <div className={classes.title}>{title}</div>
      {children}
    </div>
  </div>
)

export default injectStyles(styles)(resetScrollPositionOnMount(PageForm))
