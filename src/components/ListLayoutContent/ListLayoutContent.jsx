// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = {
  root: {
    width: 850,
    margin: [0, 'auto'],
    paddingTop: 110,
  },
}

type Props = {|
  ...InjectStylesProps,
|}

const ListLayoutContent = ({ classes, className, ...otherProps }: Props) => (
  <div className={cx(className, classes.root)} {...otherProps} />
)

export default injectStyles(styles)(ListLayoutContent)
