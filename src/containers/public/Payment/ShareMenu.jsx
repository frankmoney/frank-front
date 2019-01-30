// @flow strict-local
import React from 'react'
import ShareIcon from 'material-ui-icons/Launch'
import LinkIcon from 'material-ui-icons/Link'
import { FacebookShareButton, TwitterShareButton } from 'react-share'
import ArrowPaper from 'components/kit/ArrowPaper'
import { TextButton } from 'components/kit/Button'
import Copied from 'components/Copied'
import Modal from 'components/kit/Modal'
import PopupBase from 'components/kit/PopupBase'
import Snack from 'components/kit/Snack'
import FacebookIcon from 'components/kit/Button/SocialButton/facebook.svg'
import TwitterIcon from 'components/kit/Button/SocialButton/twitter.svg'
import { MenuItem } from 'components/kit/Menu'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = {
  icon: {
    width: 24,
    height: 24,
    marginRight: 7,
  },
  arrowPaper: {
    width: 160,
  },
  shareButton: {
    outline: 'none',
    '&:hover': {
      background: '#F5F6F7',
    },
  },
}

type Props = {|
  ...InjectStylesProps,
  //
  url: string,
|}

const ShareMenu = ({ classes, className, url }: Props) => (
  <Copied message="Public link has been copied to clipboard" Snack={Snack}>
    {({ onCopy }) => (
      <PopupBase place="down" align="end" alignByArrow distance={15}>
        {({
          open,
          toggleClose,
          toggle,
          getAnchorProps,
          getPopupProps,
          getArrowProps,
        }) => (
          <>
            <TextButton
              className={className}
              color="faintGray"
              icon={<ShareIcon className={classes.icon} />}
              label="Share"
              larger
              onClick={toggle}
              {...getAnchorProps()}
            />
            <Modal open={open} invisibleBackdrop onClose={toggleClose}>
              <ArrowPaper
                {...getPopupProps()}
                arrowProps={getArrowProps()}
                className={classes.arrowPaper}
                direction="up"
                align="end"
              >
                <FacebookShareButton url={url} className={classes.shareButton}>
                  <MenuItem
                    label="Facebook"
                    icon={<FacebookIcon />}
                    value="facebook"
                    onClick={toggleClose}
                  />
                </FacebookShareButton>
                <TwitterShareButton url={url} className={classes.shareButton}>
                  <MenuItem
                    label="Twitter"
                    icon={<TwitterIcon />}
                    onClick={toggleClose}
                  />
                </TwitterShareButton>
                <MenuItem
                  className={classes.shareButton}
                  label="Copy link"
                  icon={<LinkIcon />}
                  onClick={() => {
                    onCopy(url)
                    toggleClose()
                  }}
                />
              </ArrowPaper>
            </Modal>
          </>
        )}
      </PopupBase>
    )}
  </Copied>
)

export default injectStyles(styles)(ShareMenu)
