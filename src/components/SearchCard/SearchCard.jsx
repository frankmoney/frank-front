import React from 'react'
import cx from 'classnames'
import { InputAdornment } from 'material-ui'
import { Search as SearchIcon } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'
import { Paper, TextField } from '@frankmoney/components'
import styles from './SearchCard.jss'

const AdornmentIcon = ({ className }) => (
  <InputAdornment position="start">
    <SearchIcon className={className} />
  </InputAdornment>
)

const SearchCard = ({ classes, className, onChange, value, placeholder }) => (
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
      placeholder={placeholder}
      fontBig
    />
  </Paper>
)

export default injectStyles(styles)(SearchCard)