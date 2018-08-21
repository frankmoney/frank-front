import React from 'react'
import cx from 'classnames'
import { MoreHoriz as MoreOptionsIcon } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'
import { Button, IconButton } from '@frankmoney/components'
import { TwitterIcon, FacebookIcon } from './ShareIcons'

const styles = {
  container: {
    display: 'flex',
    '&>:not(:first-child)': {
      marginLeft: 10,
    },
  },
  button: {
    width: 140,
  },
}

const ShareButtons = ({ classes, className }) => (
  <div className={cx(classes.container, className)}>
    <Button fat type="secondary" className={classes.button} icon={FacebookIcon}>
      Share
    </Button>
    <Button fat type="secondary" className={classes.button} icon={TwitterIcon}>
      Tweet
    </Button>
    <IconButton round icon={MoreOptionsIcon} />
  </div>
)

export default injectStyles(styles)(ShareButtons)
