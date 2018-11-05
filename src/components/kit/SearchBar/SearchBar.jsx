// @flow
import React from 'react'
import cx from 'classnames'
import { Search as SearchIcon } from 'material-ui-icons'
import { Paper } from '@frankmoney/components'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import Spinner from 'components/kit/Spinner'
import Input from 'components/kit/TextBox/Input'
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
  theme,
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
