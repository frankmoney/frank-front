// @flow
import React from 'react'
import Button from 'components/kit/Button'
import { injectStyles } from 'utils/styles'

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
  },
})

const TableEmptyPlaceholder = ({ classes, text, onReset }) => (
  <div className={classes.root}>
    <div className={classes.label}>No {text} found</div>
    <Button className={classes.resetButton} label="Reset" onClick={onReset} />
  </div>
)

export default injectStyles(styles)(TableEmptyPlaceholder)
