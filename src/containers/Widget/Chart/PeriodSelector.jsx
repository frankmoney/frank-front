import React from 'react'
import { ArrowDropDown } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'

const styles = theme => ({
  root: {
    ...theme.fontMedium(18, 26),
    color: '#252B43',
    cursor: 'pointer',
    display: 'flex',
    margin: [0, 0, 13, 2],
  },
  expander: {
    color: '#BCBFC9',
    left: 3,
    position: 'relative',
    top: 2,
  },
})

const PeriodExpander = ({ classes, text }) => (
  <div className={classes.root}>
    {text}
    <ArrowDropDown className={classes.expander} />
  </div>
)

export default injectStyles(styles)(PeriodExpander)
