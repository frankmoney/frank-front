// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import Spinner from 'components/kit/Spinner'

const styles = {
  root: {
    alignItems: 'center',
    background: '#fff',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
  },
}

const PageLoader = ({ classes, className }) => (
  <div className={cx(classes.root, className)}>
    <Spinner size={45} />
  </div>
)

export default injectStyles(styles)(PageLoader)
