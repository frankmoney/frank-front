// @flow strict-local
import React from 'react'
import cx from 'classnames'
import ListLayoutContentPaper from 'components/ListLayoutContentPaper'
import { injectStyles, type InjectStylesProps, type Theme } from 'utils/styles'

const styles = {
  root: {
    padding: 0,
  },
}

type OmittedProps = {|
  theme?: Theme,
|}

type Props = {|
  ...InjectStylesProps,
  ...OmittedProps,
|}

const Paper = ({ theme, classes, className, ...otherProps }: Props) => (
  <ListLayoutContentPaper
    className={cx(className, classes.root)}
    {...otherProps}
  />
)

export default injectStyles(styles)(Paper)
