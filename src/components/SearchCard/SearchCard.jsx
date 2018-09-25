import React from 'react'
import cx from 'classnames'
import { Search as SearchIcon } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'
import { Paper, Spinner } from '@frankmoney/components'
import TextBox from 'components/TextBox'
import styles from './SearchCard.jss'

const SearchCard = ({
  classes,
  className,
  onChange,
  value,
  placeholder,
  loading,
}) => (
  <Paper className={cx(classes.root, className)}>
    <SearchIcon className={classes.icon} />
    <TextBox
      className={classes.field}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disableUnderline
    />
    {loading && <Spinner className={classes.spinner} />}
  </Paper>
)

export default injectStyles(styles)(SearchCard)
