// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import Button, { type ButtonProps } from 'components/kit/Button'

const styles = {
  root: {
    width: '100%',
    flexGrow: 1,
    '&:not(:last-child)': {
      marginRight: 20,
    },
  },
}

type Props = {|
  ...ButtonProps,
  ...InjectStylesProps,
|}

const DialogButton = ({
  classes,
  className,
  compactHeight,
  ...otherProps
}: Props) => (
  <Button
    className={cx(classes.root, className)}
    compactHeight
    {...otherProps}
  />
)

export default injectStyles(styles)(DialogButton)
