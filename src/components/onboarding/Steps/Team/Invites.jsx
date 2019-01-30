// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import Invite from './Invite'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  item: {
    marginRight: 10,
    marginBottom: 10,
  },
}

const Invites = ({ classes, className, invites }) => (
  <div className={cx(classes.root, className)}>
    {invites.map(({ email }) => (
      <Invite key={email} className={classes.item} email={email} />
    ))}
  </div>
)

export default injectStyles(styles)(Invites)
