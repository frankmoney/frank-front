// @flow strict-local
import React from 'react'
import { injectStyles } from 'utils/styles'
import CaughtUpPNG from './caughtUp.png'

const styles = theme => ({
  root: {
    color: '#252B43',
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: 273,
    height: 266,
  },
  title: {
    ...theme.fontSemibold(40, 48),
    marginTop: 8,
  },
  text: {
    ...theme.fontSemibold(22, 30),
    marginTop: 9,
  },
})

const NoResultsPlaceholder = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.wrapper}>
      <img src={CaughtUpPNG} className={classes.image} alt="" />
      <div className={classes.title}>All caught up!</div>
      <div className={classes.text}>You don’t have any new payments</div>
    </div>
  </div>
)

export default injectStyles(styles)(NoResultsPlaceholder)
