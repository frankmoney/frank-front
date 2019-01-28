// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import Paper, { type PaperProps } from 'components/kit/Paper'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = {
  root: {
    outline: 'none',
    padding: 40,
    position: 'relative',
    width: 650,
  },
}

type Props = {|
  ...InjectStylesProps,
  ...PaperProps,
  //
  children?: React.Node,
|}

const DialogPaper = ({
  children,
  classes,
  className,
  // omit
  type,
  ...otherProps
}: Props) => (
  <Paper
    className={cx(classes.root, className)}
    disableOverflow
    role="dialog"
    type="modal"
    {...otherProps}
  >
    {children}
  </Paper>
)

export default injectStyles(styles)(DialogPaper)
