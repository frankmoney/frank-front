// @flow strict-local
import React from 'react'
import copyToClipboard from 'clipboard-copy'
import { compose, withState } from 'recompose'
import Dialog from 'components/kit/Dialog'
import PublicLinkButton from 'components/PublicLinkButton'
import reconnect from 'utils/reconnect'
import { injectStyles } from 'utils/styles'
import ShareButtons from 'components/common/ShareButtons'
import SidebarSnack from 'components/SidebarSnack'
import { isShareDialogOpenSelector, shareDialogUrlSelector } from './selectors'
import * as ACTIONS from './actions'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginBottom: 49,
  },
  subtitle: {
    color: '#A6A9B7',
    marginBottom: 19,
  },
  link: {
    margin: [-6, 0, 30],
  },
}

const StoryPublishedDialog = ({
  classes,
  open,
  url,
  urlCopiedSnackShown,
  setUrlCopiedSnackShown,
  onClose,
}) => {
  const { protocol, host } = window.location

  return (
    <Dialog closeButton open={open} onClose={onClose} className={classes.root}>
      <Dialog.Title className={classes.title}>
        The story was published
      </Dialog.Title>
      <div className={classes.subtitle}>Public page</div>
      <PublicLinkButton
        className={classes.link}
        url={`${protocol}//${host}${url}`}
        label={`${host}${url}`}
        onClick={async event => {
          event.preventDefault()
          await copyToClipboard(`${protocol}//${host}${url}`)
          setUrlCopiedSnackShown(true)
        }}
      />
      <div className={classes.subtitle}>Share story</div>
      <ShareButtons url={url} large />
      <SidebarSnack
        color="dark"
        shown={urlCopiedSnackShown}
        message="Story URL was copied into clipboard"
        onDismiss={() => setUrlCopiedSnackShown(false)}
      />
    </Dialog>
  )
}

export default compose(
  reconnect(
    {
      open: isShareDialogOpenSelector,
      url: shareDialogUrlSelector,
    },
    {
      onClose: ACTIONS.toggleShareDialog,
    }
  ),
  withState('urlCopiedSnackShown', 'setUrlCopiedSnackShown'),
  injectStyles(styles)
)(StoryPublishedDialog)
