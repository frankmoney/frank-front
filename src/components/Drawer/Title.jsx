import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import Clamp from 'shiitake'

const styles = theme => ({
  root: {
    ...theme.fontSemibold(40, 46),
  },
})

const Title = ({ theme, classes, clamp, children, ...otherProps }) =>
  clamp ? (
    <Clamp className={classes.root} lines={clamp} {...otherProps}>
      {children}
    </Clamp>
  ) : (
    <div className={classes.root} {...otherProps}>
      {children}
    </div>
  )

export default injectStyles(styles)(Title)
