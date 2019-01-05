// @flow
import React from 'react'
import cx from 'classnames'
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
} from 'react-share'
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

const ShareButtons = ({
  classes,
  className,
  large,
  shortEmail,
  small,
  url,
}) => (
  <div className={cx(classes.container, className)}>
    <FacebookShareButton url={url}>
      <SocialButton type="facebook" small={small} large={large} />
    </FacebookShareButton>
    <TwitterShareButton url={url}>
      <SocialButton type="twitter" small={small} large={large} />
    </TwitterShareButton>
    <EmailShareButton url={url}>
      <SocialButton
        type="email"
        small={small}
        large={large}
        noLabel={shortEmail}
      />
    </EmailShareButton>
  </div>
)

export default injectStyles(styles)(ShareButtons)
