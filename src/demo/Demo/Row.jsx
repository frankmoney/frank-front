// @flow
import * as React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = {
  row: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 375,
    '& > :not(:last-child)': {
      marginRight: 20,
    },
    marginBottom: 20,
  },
  wide: {
    width: 850,
  },
  centered: {
    justifyContent: 'center',
  },
}

type Props = {|
  ...InjectStylesProps,
  //
  centered?: boolean,
  children: React.Node,
  wide?: boolean,
|}

const Row = ({ centered, children, classes, className, wide }: Props) => (
  <div
    className={cx(
      classes.row,
      { [classes.centered]: centered, [classes.wide]: wide },
      className
    )}
  >
    {children}
  </div>
)

export default injectStyles(styles)(Row)
