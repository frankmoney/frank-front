// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import Paper, { type PaperProps } from 'components/kit/Paper'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = {
  root: {
    width: 650,
    padding: 40,
    outline: 'none',
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
  disableOutline,
  // omit
  type,
  ...otherProps
}: Props) => (
  <Paper
    className={cx(classes.root, className)}
    disableOutline={disableOutline}
    role="dialog"
    type="modal"
    {...otherProps}
  >
    {children}
  </Paper>
)

export default injectStyles(styles)(DialogPaper)
