// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import type { InjectStylesProps, Grid, Theme } from 'utils/styles'

const styles = {
  root: {
    width: ({ grid }) => grid.fixed.contentWidth,
    margin: [0, 'auto'],
    paddingTop: 110,
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

const ListLayoutContent = ({
  theme,
  grid,
  classes,
  className,
  ...otherProps
}: Props) => <div className={cx(className, classes.root)} {...otherProps} />

export default injectStyles(styles, { grid: true })(ListLayoutContent)
