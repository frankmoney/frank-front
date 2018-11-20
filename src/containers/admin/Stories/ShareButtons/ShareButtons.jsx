// @flow
import React from 'react'
import cx from 'classnames'
import { FacebookShareButton, TwitterShareButton } from 'react-share'
import { SocialButton } from 'components/kit/Button'
import { injectStyles } from 'utils/styles'

const styles = {
  container: {
    display: 'flex',
    '&>:not(:first-child)': {
      marginLeft: 10,
    },
  },
}

const ShareButtons = ({ classes, className, url }) => (
  <div className={cx(classes.container, className)}>
    <FacebookShareButton url={url}>
      <SocialButton type="facebook" large />
    </FacebookShareButton>
    <TwitterShareButton url={url}>
      <SocialButton type="twitter" large />
    </TwitterShareButton>
  </div>
)

export default injectStyles(styles)(ShareButtons)
