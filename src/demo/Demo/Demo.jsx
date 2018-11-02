// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import DemoMenu from './DemoMenu'

const styles = {
  demo: {
    alignItems: 'center',
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 100,
    paddingTop: 100,
    '& > h1': {
      marginTop: 70,
      fontSize: 60,
      lineHeight: 60,
      fontWeight: 500,
      '&:first-child': {
        marginTop: 0,
      },
    },
    '& > h2': {
      marginTop: 80,
      marginBottom: 60,
      fontSize: 40,
      lineHeight: 50,
      fontWeight: 500,
    },
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 400,
    '& > *': {
      marginRight: 20,
    },
    marginBottom: 20,
  },
}

const Demo = ({ classes, children, ...props }) => (
  <div className={classes.demo} {...props}>
    <DemoMenu />
    {children}
  </div>
)

export default injectStyles(styles)(Demo)

export const Row = injectStyles(styles)(({ classes, className, ...props }) => (
  <div className={cx(classes.row, className)} {...props} />
))
