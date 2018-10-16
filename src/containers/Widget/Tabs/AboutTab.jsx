import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import Totals from '../Totals'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  title: {
    ...theme.fontMedium(28, 40), // TODO: variable font size
  },
  totals: {
    marginTop: 59, // FIXME: tmp
    width: 360,
    marginLeft: 2,
    // TODO: fix font size
  },
})

const AboutTab = ({ classes, className }) => (
  <div className={cx(classes.root, className)}>
    <div className={classes.title}>MakeaChamp</div>
    <Totals className={classes.totals} />
    TODO
  </div>
)

export default injectStyles(styles)(AboutTab)
