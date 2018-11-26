// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import Button, { type ButtonProps } from 'components/kit/Button'

export type DialogButtonProps = ButtonProps

const styles = {
  root: {
    height: 40,
    width: '100%',
    flexGrow: 1,
    '&:not(:last-child)': {
      marginRight: 20,
    },
  },
}

const DialogButton = ({
  classes,
  className,
  ...otherProps
}: DialogButtonProps) => (
  <Button className={cx(classes.root, className)} {...otherProps} />
)

export default injectStyles(styles)(DialogButton)
