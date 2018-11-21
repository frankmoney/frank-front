// @flow
import React from 'react'
import cx from 'classnames'
import SearchIcon from 'material-ui-icons/Search'
import Paper from 'components/kit/Paper'
import Spinner from 'components/kit/Spinner'
import Input from 'components/kit/TextBox/Input'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import styles from './SearchBar.jss'

type OnChangeCb = () => void

type Props = {|
  ...InjectStylesProps,
  //
  loading?: boolean,
  onChange?: OnChangeCb,
  placeholder?: string,
  value?: string,
|}

const SearchBar = ({
  classes,
  className,
  loading,
  onChange,
  placeholder,
  value,
  ...otherProps
}: Props) => (
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
