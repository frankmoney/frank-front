// @flow strict-local
import React from 'react'
import { compose } from 'recompose'
import Dialog from 'components/kit/Dialog'
import PublicLinkButton from 'components/PublicLinkButton'
import reconnect from 'utils/reconnect'
import { injectStyles } from 'utils/styles'
import ShareButtons from './ShareButtons'
import { isShareDialogOpenSelector, shareDialogUrlSelector } from './selectors'
import * as ACTIONS from './actions'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginBottom: 54,
  },
  subtitle: {
    color: '#A6A9B7',
    marginBottom: 19,
  },
  link: {
    fontSize: 18,
    margin: [-4, 0, 32],
  },
  linkIcon: {
    width: 22,
    height: 22,
    marginRight: 9,
  },
  linkText: {
    ...theme.fontMedium(18),
  },
})

const StoryPublishedDialog = ({ classes, open, url, onClose }) => (
  <Dialog closeButton open={open} onClose={onClose} className={classes.root}>
    <Dialog.Title className={classes.title}>
      The story was published
    </Dialog.Title>
    <div className={classes.subtitle}>Public page</div>
    <PublicLinkButton
      className={classes.link}
      iconClassName={classes.linkIcon}
      labelClassName={classes.linkText}
      to={url}
      label={url}
    />
    <div className={classes.subtitle}>Share story</div>
    <ShareButtons url={url} />
  </Dialog>
)

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
