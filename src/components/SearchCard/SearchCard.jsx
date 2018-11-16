// @flow
import React from 'react'
import cx from 'classnames'
import SearchIcon from 'material-ui-icons/Search'
import Paper from 'components/kit/Paper'
import Spinner from 'components/kit/Spinner'
import TextBox from 'components/TextBox'
import { injectStyles } from 'utils/styles'
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
