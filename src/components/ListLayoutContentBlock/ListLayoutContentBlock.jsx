// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = {
  root: {
    marginBottom: 35,
  },
}

type Props = {|
  ...InjectStylesProps,
|}

const ListLayoutContentBlock = ({
  classes,
  className,
  ...otherProps
}: Props) => <div className={cx(className, classes.root)} {...otherProps} />

export default injectStyles(styles)(ListLayoutContentBlock)
