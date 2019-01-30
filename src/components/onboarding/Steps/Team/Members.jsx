import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import TeamMember from './Member'

const styles = {
  root: {},
  item: {
    '&:not(:last-child)': {
      borderBottom: '1px solid rgba(37, 43, 67, 0.07)',
    },
  },
}

const Members = ({ classes, className, members }) => (
  <div className={cx(classes.root, className)}>
    {members.map(({ id, color, avatar, firstName, lastName, email }) => (
      <TeamMember
        key={id}
        color={color}
        avatar={avatar}
        firstName={firstName}
        lastName={lastName}
        email={email}
        className={classes.item}
      />
    ))}
  </div>
)

export default injectStyles(styles)(Members)
