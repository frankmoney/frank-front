// @flow strict-local
import React from 'react'
import ShareIcon from 'material-ui-icons/Launch'
import LinkIcon from 'material-ui-icons/Link'
import { FacebookShareButton, TwitterShareButton } from 'react-share'
import { TextButton } from 'components/kit/Button'
import ButtonMenu from 'components/kit/ButtonMenu'
import Copied from 'components/Copied'
import Snack from 'components/kit/Snack'
import FacebookIcon from 'components/kit/Button/SocialButton/facebook.svg'
import TwitterIcon from 'components/kit/Button/SocialButton/twitter.svg'
import { MenuItem } from 'components/kit/Menu'
import { type Ref } from 'flow/react'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = {
  icon: {
    width: 24,
    height: 24,
    marginRight: 7,
  },
  hidden: {
    display: 'none',
  },
  arrowPaper: {
    width: 160,
  },
}

type Props = {|
  ...InjectStylesProps,
  //
  url: string,
|}

class ShareMenu extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.facebookShare = React.createRef()
    this.twitterShare = React.createRef()
  }

  facebookShare: Ref
  twitterShare: Ref

  render() {
    const { classes, className, url } = this.props
    return (
      <>
        <FacebookShareButton
          additionalProps={{ ref: this.facebookShare }}
          className={classes.hidden}
          url={url}
        />
        <TwitterShareButton
          additionalProps={{ ref: this.twitterShare }}
          className={classes.hidden}
          url={url}
        />
        <Copied
          message="Public link has been copied to clipboard"
          Snack={Snack}
        >
          {({ onCopy }) => (
            <ButtonMenu
              align="end"
              arrowEnd
              direction="down"
              menuProps={{ className: classes.arrowPaper }}
              renderButton={popupState => (
                <TextButton
                  className={className}
                  color="faintGray"
                  icon={<ShareIcon className={classes.icon} />}
                  label="Share"
                  larger
                  onClick={popupState.toggle}
                  {...popupState.getAnchorProps()}
                />
              )}
            >
              <MenuItem
                icon={<FacebookIcon />}
                label="Facebook"
                onSelect={() => {
                  if (this.facebookShare.current) {
                    this.facebookShare.current.click()
                  }
                }}
              />
              <MenuItem
                icon={<TwitterIcon />}
                label="Twitter"
                onSelect={() => {
                  if (this.twitterShare.current) {
                    this.twitterShare.current.click()
                  }
                }}
              />
              <MenuItem
                label="Copy link"
                icon={<LinkIcon />}
                onSelect={() => onCopy(url)}
              />
            </ButtonMenu>
          )}
        </Copied>
      </>
    )
  }
}

export default injectStyles(styles)(ShareMenu)
