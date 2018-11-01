import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { Edit as EditIcon, Public as PublicIcon } from 'material-ui-icons'
import { Button, LinkButton } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import { createRouteUrl } from '@frankmoney/utils'
import { formatFullDate } from 'utils/datesLight'
import { ROUTES } from 'const'
import { storySelector } from './selectors'

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

const HeaderBarButtons = ({
  classes,
  className,
  story: {
    pid,
    publishedAt,
    draft: { published },
  },
}) => (
  <div className={cx(classes.container, className)}>
    {!published && <div className={classes.draft}>Draft</div>}
    {publishedAt && (
      <>
        <div className={classes.published}>
          Published {formatFullDate(publishedAt)}
        </div>
        <LinkButton type="secondary" icon={PublicIcon}>
          See the public page
        </LinkButton>
      </>
    )}
    <Button
      className={classes.discussButton}
      fat
      type="secondary"
      icon={EditIcon}

      href={createRouteUrl(ROUTES.manage.stories.storyEdit, { id: pid })}

    >
      Edit story
    </Button>
  </div>
)

export default compose(
  connect(state => ({
    story: storySelector(state),
  })),
  injectStyles(styles)
)(HeaderBarButtons)
