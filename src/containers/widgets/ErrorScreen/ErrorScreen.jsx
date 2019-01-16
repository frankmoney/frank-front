// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import { Header, HeaderItem } from '../TabbedLayout/Header'
import ClockIcon from './ClockIcon.svg'
import LockIcon from './LockIcon.svg'

const styles = theme => ({
  large: {
    ...theme.fontRegular(20),
  },
  medium: {
    ...theme.fontRegular(18),
  },
  small: {
    ...theme.fontRegular(16),
  },
  error: {
    alignItems: 'center',
    color: '#8F93A4',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    flex: [1, 0],
    flexDirection: 'column',
    padding: [0, 0, 20, 2],
  },
  icon: {
    '$large &': {
      marginBottom: 30,
      height: 40,
    },
    '$medium &': {
      marginBottom: 25,
      height: 30,
    },
    '$small &': {
      marginBottom: 20,
      height: 24,
    },
  },
})

export type ErrorCause = 'private' | 'empty'

export type ErrorScreenSize = 'large' | 'medium' | 'small'

type Props = {|
  ...InjectStylesProps,
  cause: ErrorCause,
  size: ErrorScreenSize,
|}

const ErrorScreen = ({ cause, classes, className, size }: Props) => {
  const isEmpty = cause === 'empty'
  const isPrivate = cause === 'private'
  return (
    <div
      className={cx(
        {
          [classes.large]: size === 'large',
          [classes.medium]: size === 'medium',
          [classes.small]: size === 'small',
        },
        className
      )}
    >
      <Header live={false} small={size === 'small'}>
        <HeaderItem name="Payments" active />
      </Header>
      <div className={classes.error}>
        {isEmpty && (
          <>
            <ClockIcon className={classes.icon} />
            <span>No shared payments yet</span>
          </>
        )}
        {isPrivate && (
          <>
            <LockIcon className={classes.icon} />
            <span>This account is set to private</span>
          </>
        )}
      </div>
    </div>
  )
}

ErrorScreen.defaultProps = {
  size: 'large',
}

export default injectStyles(styles)(ErrorScreen)
