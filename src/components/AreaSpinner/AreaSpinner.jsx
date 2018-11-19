// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import Spinner, { type SpinnerProps } from 'components/kit/Spinner'

const styles = {
  root: {
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
}

type Props = {|
  ...InjectStylesProps,
  ...SpinnerProps,
|}

export type AreaSpinner = Props

const AreaSpinner = ({
  theme,
  classes,
  size,
  className,
  ...otherProps
}: Props) => (
  <div className={cx(classes.root, className)} {...otherProps}>
    <Spinner size={size} />
  </div>
)

export default injectStyles(styles)(AreaSpinner)
