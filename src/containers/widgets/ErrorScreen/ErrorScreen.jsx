// @flow strict-local
import React from 'react'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import { Header, HeaderItem } from '../TabbedLayout/Header'
import ClockIcon from './ClockIcon.svg'
import LockIcon from './LockIcon.svg'

const styles = theme => ({
  root: {
    ...theme.fontRegular(20),
    alignItems: 'center',
    color: '#8F93A4',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: [0, 0, 20, 2],
  },
  icon: {
    marginBottom: 30,
  },
})

export type ErrorCause = 'private' | 'empty'

type Props = {|
  ...InjectStylesProps,
  cause: ErrorCause,
|}

const ErrorScreen = ({ cause, classes }: Props) => {
  const isEmpty = cause === 'empty'
  const isPrivate = cause === 'private'
  return (
    <>
      <Header live={false}>
        <HeaderItem name="Payments" active />
      </Header>
      <div className={classes.root}>
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
    </>
  )
}

export default injectStyles(styles)(ErrorScreen)
