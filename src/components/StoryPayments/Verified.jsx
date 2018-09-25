import React from 'react'
import { VerifiedUser as VerifiedIcon } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'

const styles = theme => ({
  container: {
    ...theme.fontRegular(16, 22),
    color: 'rgba(37, 43, 67, 0.5)',
    display: 'flex',
    whiteSpace: 'pre',
    alignItems: 'center',
  },
  icon: {
    color: '#21CB61',
    width: 20,
    height: 20,
    marginRight: 6,
  },
  verified: {
    color: '#21CB61',
    fontWeight: 500,
  },
  frank: {
    fontWeight: 500,
  },
})

const VerifiedByFrank = ({ classes }) => (
  <div className={classes.container}>
    <VerifiedIcon className={classes.icon} />
    <span className={classes.verified}>Verified</span> by{' '}
    <span className={classes.frank}>Frank</span>
  </div>
)

export default injectStyles(styles)(VerifiedByFrank)
