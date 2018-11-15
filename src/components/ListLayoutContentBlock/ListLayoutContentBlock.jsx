// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import type { InjectStylesProps, Grid, Theme } from 'utils/styles'

const styles = {
  root: {
    marginBottom: ({ grid }) => grid.fixed.gutterSize,
  },
}

type OmittedProps = {|
  theme?: Theme,
|}

type Props = {|
  ...InjectStylesProps,
  ...OmittedProps,
  //
  grid: Grid,
|}

const ListLayoutContentBlock = ({
  classes,
  className,
  grid,
  // omit
  theme,
  ...otherProps
}: Props) => <div className={cx(className, classes.root)} {...otherProps} />

export default injectStyles(styles, { grid: true })(ListLayoutContentBlock)
