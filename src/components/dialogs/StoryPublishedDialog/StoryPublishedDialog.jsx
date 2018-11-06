// @flow
import React from 'react'
import { Public as PublicIcon } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'
import { PopupDialog, LinkButton } from '@frankmoney/components'
import ShareButtons from 'components/ShareButtons'

const styles = theme => ({
  subtitle: {
    ...theme.fontRegular(16, 24),
    color: 'rgba(32, 40, 74, 0.4)',
  },
  container: {
    marginTop: 10,
    marginBottom: 6,
  },
  public: {
    composes: '$subtitle',
    marginTop: 5,
    marginBottom: 7,
  },
  share: {
    composes: '$subtitle',
    marginTop: 24,
    marginBottom: 16,
  },
  link: {
    color: theme.colors.black,
    '&:hover': {
      color: theme.colors.blue,
    },
  },
})

const StoryPublishedDialog = ({ classes, url, ...dialogProps }) => (
  <PopupDialog title="The story was published" {...dialogProps}>
    <div className={classes.container}>
      <div className={classes.public}>Public page</div>
      <LinkButton className={classes.link} icon={PublicIcon}>
        {url}
      </LinkButton>
      <div className={classes.share}>Share story</div>
      <ShareButtons url={url} />
    </div>
  </PopupDialog>
)

export default injectStyles(styles)(StoryPublishedDialog)
