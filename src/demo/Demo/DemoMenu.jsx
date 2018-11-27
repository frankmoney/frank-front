// @flow strict-local
import React from 'react'
import { ROUTES } from 'const'
import { injectStyles } from 'utils/styles'

const styles = {
  root: {
    position: 'fixed',
    right: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    opacity: 0.2,
    '&:hover': {
      opacity: 1,
    },
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    margin: [5, 0],
  },
  link: {
    fontSize: 16,
    textDecoration: 'none',
    margin: [4, 0],
    color: '#252B43',
    '&:hover': {
      color: '#4C51F3',
    },
  },
}

const DemoMenu = ({ classes }) => (
  <div className={classes.root}>
    <a href={ROUTES.demo.buttons} className={classes.link}>
      Buttons
    </a>
    <a href={ROUTES.demo.fields} className={classes.link}>
      Fields
    </a>
    <a href={ROUTES.demo.fieldsLeft} className={classes.link}>
      (WIP)Fields:left
    </a>
    <a href={ROUTES.demo.popups} className={classes.link}>
      Popups
    </a>
    <a href={ROUTES.demo.selects} className={classes.link}>
      Selects
    </a>
    <a href={ROUTES.demo.selectsDate} className={classes.link}>
      Selects:date
    </a>
    <a href={ROUTES.demo.selectLists} className={classes.link}>
      Select lists
    </a>
    <a href={ROUTES.demo.switches} className={classes.link}>
      Switches
    </a>
    <a href={ROUTES.demo.dialogs} className={classes.link}>
      Dialogs
    </a>
    <a href={ROUTES.demo.drawers} className={classes.link}>
      Drawers
    </a>
    <a href={ROUTES.demo.forms} className={classes.link}>
      Forms
    </a>
  </div>
)

export default injectStyles(styles)(DemoMenu)
