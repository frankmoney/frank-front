// @flow strict-local
import React from 'react'
import GlobeIcon from 'material-ui-icons/Public'
import { compose } from 'recompose'
import Dialog from 'components/kit/Dialog'
import reconnect from 'utils/reconnect'
import { injectStyles } from 'utils/styles'
import ShareButtons from 'components/common/ShareButtons'
import { isShareDialogOpenSelector, shareDialogUrlSelector } from './selectors'
import * as ACTIONS from './actions'

const styles = theme => ({
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
    display: 'inline-flex',
    alignItems: 'center',
    margin: [-6, 0, 30],
    padding: 4,
    ...theme.fontMedium(18),
  },
  linkIcon: {
    width: 22,
    height: 22,
    marginRight: 11,
  },
})

const StoryPublishedDialog = ({ classes, open, url, onClose }) => {
  const { protocol, host } = window.location

  return (
    <Dialog closeButton open={open} onClose={onClose} className={classes.root}>
      <Dialog.Title className={classes.title}>
        The story was published
      </Dialog.Title>
      <div className={classes.subtitle}>Public page</div>
      <div className={classes.link}>
        <GlobeIcon className={classes.linkIcon} />
        {`${protocol}//${host}${url}`}
      </div>
      <div className={classes.subtitle}>Share story</div>
      <ShareButtons url={url} large />
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
  injectStyles(styles)
)(StoryPublishedDialog)
