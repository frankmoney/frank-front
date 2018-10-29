import React from 'react'
import cx from 'classnames'
import { Search as SearchIcon } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'
import { Paper, Spinner } from '@frankmoney/components'
import Input from 'components/kit/TextBox/Input'
import styles from './SearchBar.jss'

const SearchBar = ({
  classes,
  className,
  theme,
  onChange,
  value,
  placeholder,
  loading,
  ...otherProps
}) => (
  <Paper className={cx(classes.root, className)} {...otherProps}>
    <SearchIcon className={classes.icon} />
    <Input
      className={classes.field}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
    {loading && <Spinner className={classes.spinner} />}
  </Paper>
)

export default injectStyles(styles)(SearchBar)
