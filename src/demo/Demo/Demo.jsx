// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import DemoMenu from './DemoMenu'

const styles = {
  demo: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 100,
    minHeight: '100vh',
    background: props => (props.gray ? '#E5E5E5' : '#fff'),
    '& > h1': {
      display: 'flex',
      alignItems: 'center',
      marginTop: 70,
      fontSize: 60,
      lineHeight: 60,
      fontWeight: 500,
      '&:first-child': {
        marginTop: 0,
      },
    },
    '& > h2': {
      display: 'flex',
      alignItems: 'center',
      marginTop: 80,
      marginBottom: 60,
      fontSize: 40,
      lineHeight: 50,
      fontWeight: 500,
    },
  },
}

const Demo = ({ classes, className, children, gray, ...props }) => (
  <div className={cx(classes.demo, className)} {...props}>
    <DemoMenu />
    {children}
  </div>
)

export default injectStyles(styles)(Demo)
