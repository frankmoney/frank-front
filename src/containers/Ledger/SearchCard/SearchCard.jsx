import React from 'react'
import cx from 'classnames'
import { InputAdornment } from 'material-ui'
import { Search as SearchIcon } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'
import { TextField } from '@frankmoney/components'
import styles from './SearchCard.jss'

const AdornmentIcon = ({ className }) => (
  <InputAdornment position="start">
    <SearchIcon className={className} />
  </InputAdornment>
)

const SearchCard = ({ className, classes, value, onChange }) => (
  <div className={cx(classes.card, className)}>
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
  </div>
)

export default injectStyles(styles)(SearchCard)
