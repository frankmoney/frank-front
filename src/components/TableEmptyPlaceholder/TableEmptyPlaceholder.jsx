import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import { Button } from '@frankmoney/components'

const styles = theme => ({
  root: {
    marginTop: 150,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  label: {
    ...theme.fontRegular(22),
    color: 'rgba(0,0,0,0.5)',
    marginBottom: 30,
  },
  resetButton: {
    width: 131,
    backgroundColor: 'rgba(37, 43, 67, 0.07)',
  },
})

const TableEmptyPlaceholder = ({ classes, text, onReset }) => (
  <div className={classes.root}>
    <div className={classes.label}>No {text} found</div>
    <Button
      className={classes.resetButton}
      fat
      type="secondary"
      label="Reset"
      onClick={onReset}
    />
  </div>
)

export default injectStyles(styles)(TableEmptyPlaceholder)
