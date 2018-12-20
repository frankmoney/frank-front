// @flow
import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import EditIcon from 'material-ui-icons/Edit'
import { createRouteUrl } from '@frankmoney/utils'
import PublicLinkButton from 'components/PublicLinkButton'
import RouterLink from 'components/RouterLink'
import Button from 'components/kit/Button'
import { formatFullDate } from 'utils/datesLight'
import { injectStyles } from 'utils/styles'
import { ROUTES } from 'const'
import { currentAccountIdSelector } from 'redux/selectors/user'
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
  editButton: {
    width: 140,
  },
})

const HeaderBarButtons = ({
  classes,
  className,
  accountId,
  story: {
    id: storyId,
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
        <PublicLinkButton
          url={createRouteUrl(
            ROUTES.account.stories.idRoot,
            {
              accountId,
              storyId,
            },
            { public: true }
          )}
          label="See the public page"
        />
      </>
    )}
    <RouterLink
      to={createRouteUrl(ROUTES.account.stories.idRootEdit, {
        accountId,
        storyId,
      })}
    >
      <Button
        label="Edit story"
        icon={<EditIcon />}
        className={classes.editButton}
      />
    </RouterLink>
  </div>
)

export default compose(
  connect(state => ({
    accountId: currentAccountIdSelector(state),
    story: storySelector(state),
  })),
  injectStyles(styles)
)(HeaderBarButtons)
