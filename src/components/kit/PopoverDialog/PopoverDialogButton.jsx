// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import Button, { type ButtonProps } from 'components/kit/Button'

const styles = {
  root: {
    height: 40,
    width: '100%',
    flexGrow: 1,
    '&:not(:last-child)': {
      marginRight: 15,
    },
  },
}

type Props = {|
  ...ButtonProps,
  ...InjectStylesProps,
|}

const PopoverDialogButton = ({ classes, className, ...otherProps }: Props) => (
  <Button className={cx(classes.root, className)} {...otherProps} />
)

export default injectStyles(styles)(PopoverDialogButton)
