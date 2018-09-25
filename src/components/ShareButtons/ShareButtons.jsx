import React from 'react'
import cx from 'classnames'
import { FacebookShareButton, TwitterShareButton } from 'react-share'
import { injectStyles } from '@frankmoney/ui'
import { Button } from '@frankmoney/components'
import TwitterIcon from './TwitterIcon'
import FacebookIcon from './FacebookIcon'

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

const ShareButtons = ({ classes, className, url }) => (
  <div className={cx(classes.container, className)}>
    <FacebookShareButton url={url}>
      <Button
        fat
        type="secondary"
        className={classes.button}
        icon={FacebookIcon}
      >
        Share
      </Button>
    </FacebookShareButton>
    <TwitterShareButton url={url}>
      <Button
        fat
        type="secondary"
        className={classes.button}
        icon={TwitterIcon}
      >
        Tweet
      </Button>
    </TwitterShareButton>
  </div>
)

export default injectStyles(styles)(ShareButtons)
