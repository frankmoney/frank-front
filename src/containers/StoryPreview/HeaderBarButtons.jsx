import React from 'react'
import cx from 'classnames'
import { Edit as EditIcon, Public as PublicIcon } from 'material-ui-icons'
import { Button, LinkButton } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import { formatFullDate } from 'utils/dates'

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    flex: [1, 1],
    padding: [0, 15],
    '&>:not(:first-child)': {
      marginLeft: 30,
    },
  },
  published: {
    ...theme.fontRegular(16),
    color: 'rgba(37, 43, 67, 0.5)',
  },
  draft: {
    ...theme.fontRegular(16),
    color: '#FF3939',
  },
})

const HeaderBarButtons = ({ classes, className, id, publishedDate }) => (
  <div className={cx(classes.container, className)}>
    {publishedDate ? (
      <>
        <div className={classes.published}>
          Published {formatFullDate(publishedDate)}
        </div>
        <LinkButton type="secondary" icon={PublicIcon}>
          See the public page
        </LinkButton>
      </>
    ) : (
      <div className={classes.draft}>Draft</div>
    )}

    <Button
      className={classes.discussButton}
      fat
      type="secondary"
      icon={EditIcon}
    >
      Edit story
    </Button>
  </div>
)

export default injectStyles(styles)(HeaderBarButtons)
