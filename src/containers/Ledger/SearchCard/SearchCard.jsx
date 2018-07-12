import React from 'react'
import cx from 'classnames'
import { InputAdornment } from 'material-ui'
import { Search as SearchIcon } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'
import { TextField } from '@frankmoney/components'
import Paper from 'containers/Paper'
import styles from './SearchCard.jss'

const AdornmentIcon = ({ className }) => (
  <InputAdornment position="start">
    <SearchIcon className={className} />
  </InputAdornment>
)

const SearchCard = ({ classes, className, onChange, value }) => (
  <Paper className={cx(classes.card, className)}>
    <TextField
      className={classes.field}
      value={value}
      onChange={onChange}
      InputProps={{
        classes: { input: classes.fieldInput },
        disableUnderline: true,
        startAdornment: <AdornmentIcon className={classes.adornmentIcon} />,
      }}
      placeholder="Start typing a category, recipient or part of a description..."
      fontBig
    />
  </Paper>
)

export default injectStyles(styles)(SearchCard)
