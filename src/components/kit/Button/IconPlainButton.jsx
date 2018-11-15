// @flow
import * as React from 'react'
import cx from 'classnames'
import Spinner from 'components/kit/Spinner'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import ButtonBase, { type ButtonBaseProps } from './ButtonBase'
import styles from './IconPlainButton.jss'

type IconPlainButtonColor = 'black'

type Props = {|
  ...ButtonBaseProps,
  ...InjectStylesProps,
  //
  active?: boolean,
  color: IconPlainButtonColor,
  hover?: boolean,
  icon: React.Node,
  loading?: boolean,
|}

const IconPlainButton = ({
  classes,
  className,
  // states
  active,
  hover,
  // content
  color,
  icon,
  loading,
  ...baseButtonProps
}: Props) => (
  <ButtonBase
    className={cx(
      classes.root,
      {
        [classes.black]: color === 'black',
        [classes.active]: active,
        [classes.hover]: hover,
        [classes.loading]: loading,
      },
      className
    )}
    {...baseButtonProps}
  >
    {icon}
    {loading && <Spinner className={classes.spinner} size={20} />}
  </ButtonBase>
)

IconPlainButton.defaultProps = {
  hover: false,
  active: false,
  color: 'black',
}

export default injectStyles(styles)(IconPlainButton)
