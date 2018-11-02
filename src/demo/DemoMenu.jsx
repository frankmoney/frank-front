// @flow
import React from 'react'
import { ROUTES } from 'const'
import { injectStyles } from 'utils/styles'

const styles = {
  root: {
    position: 'fixed',
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
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
    <h2 className={classes.title}>Demo</h2>
    <a href={ROUTES.demo.buttons} className={classes.link}>
      Buttons
    </a>
    <a href={ROUTES.demo.fields} className={classes.link}>
      Fields
    </a>
    <a href={ROUTES.demo.popups} className={classes.link}>
      Popups
    </a>
    <a href={ROUTES.demo.selects} className={classes.link}>
      Selects
    </a>
    <a href={ROUTES.demo.selectLists} className={classes.link}>
      Select lists
    </a>
  </div>
)

export default injectStyles(styles)(DemoMenu)
