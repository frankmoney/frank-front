// @flow
import React from 'react'
import cx from 'classnames'
import { Email as EmailIcon } from 'material-ui-icons'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import ButtonBase, { type ButtonBaseProps } from '../ButtonBase'
import FacebookIcon from './facebook.svg'
import TwitterIcon from './twitter.svg'
import styles from './SocialButton.jss'

type SocialButtonType = 'facebook' | 'twitter' | 'email'

type Props = {|
  ...ButtonBaseProps,
  ...InjectStylesProps,
  //
  active?: boolean,
  hover?: boolean,
  large?: boolean,
  type: SocialButtonType,
|}

const propsByType = {
  facebook: {
    label: 'Share',
    icon: FacebookIcon,
  },
  twitter: {
    label: 'Tweet',
    icon: TwitterIcon,
  },
  email: {
    label: 'Email',
    icon: EmailIcon,
  },
}

const SocialButton = ({
  active,
  classes,
  className,
  hover,
  large,
  type,
  ...baseButtonProps
}: Props) => {
  const { label, icon: Icon } = propsByType[type]
  return (
    <ButtonBase
      className={cx(
        classes.root,
        {
          [classes.facebook]: type === 'facebook',
          [classes.twitter]: type === 'twitter',
          [classes.email]: type === 'email',
          [classes.small]: !large,
          [classes.large]: large,
          [classes.active]: active,
          [classes.hover]: hover,
        },
        className
      )}
      {...baseButtonProps}
    >
      <Icon className={classes.icon} />
      <div className={classes.label}>{label}</div>
    </ButtonBase>
  )
}

export default injectStyles(styles)(SocialButton)
