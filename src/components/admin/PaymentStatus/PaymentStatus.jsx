import React from 'react'
import {
  CheckCircle as VerifiedIcon,
  Help as NotVerifiedIcon,
  AccessTime as PendingIcon,
} from 'material-ui-icons'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import TextTooltip from 'components/kit/TextTooltip'

const styles = theme => ({
  root: {
    display: 'flex',
    '&:hover $icon': {
      opacity: ({ verified }) => (verified ? 1 : 0.5),
    },
  },
  icon: {
    width: 22,
    height: 22,
    color: ({ verified }) =>
      verified ? theme.colors.green : theme.colors.black,
    opacity: ({ verified }) => (verified ? 1 : 0.1),
  },
})

const PaymentStatus = ({ classes, className, pending, verified }) => (
  <div className={cx(className, classes.root)}>
    <TextTooltip
      place="up"
      align="center"
      text={pending ? 'Pending' : verified ? 'Published' : 'Not published'}
      appearTimeout={250}
    >
      <div>
        {pending ? (
          <PendingIcon className={classes.icon} />
        ) : verified ? (
          <VerifiedIcon className={classes.icon} />
        ) : (
          <NotVerifiedIcon className={classes.icon} />
        )}
      </div>
    </TextTooltip>
  </div>
)

export default injectStyles(styles)(PaymentStatus)
