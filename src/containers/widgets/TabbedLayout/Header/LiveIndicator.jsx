// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'

const styles = theme => ({
  root: {
    ...theme.fontRegular(12, 20),
    background: '#252B43',
    borderRadius: 3,
    bottom: 22,
    color: '#FFFFFF',
    padding: [0, 6],
    position: 'absolute',
    right: 0,
    // letterSpacing should be 0 to match the design
  },
})

const LiveIndicator = ({ classes, className }) => (
  <div className={cx(classes.root, className)}>LIVE</div>
)

export default injectStyles(styles)(LiveIndicator)
