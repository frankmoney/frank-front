// @flow
import React from 'react'
import cx from 'classnames'
import { Email as EmailIcon } from 'material-ui-icons'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import Button, { type ButtonProps } from 'components/kit/Button'
import styles from './SocialButton.jss'
import FacebookIcon from './facebook.svg'
import TwitterIcon from './twitter.svg'

type SocialButtonType = 'facebook' | 'twitter' | 'email'

type Props = {|
  ...ButtonProps,
  ...InjectStylesProps,
  //
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
    <Button
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
      icon={<Icon />}
      label={label}
      Mixins={{ icon: classes.icon }}
      {...baseButtonProps}
    />
  )
}

export default injectStyles(styles)(SocialButton)
