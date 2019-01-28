// @flow
import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import EditIcon from 'material-ui-icons/Edit'
import { createRouteUrl } from '@frankmoney/utils'
import PublicLinkButton from 'components/PublicLinkButton'
import Button from 'components/kit/Button'
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
  story: { pid: storyId, publishedAt },
}) => (
  <div className={cx(classes.container, className)}>
    {!publishedAt && <div className={classes.draft}>Draft</div>}
    {publishedAt && (
      <>
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
    <Button
      label="Edit story"
      icon={<EditIcon />}
      href={createRouteUrl(ROUTES.account.stories.idRootEdit, {
        accountId,
        storyId,
      })}
      className={classes.editButton}
    />
  </div>
)

export default compose(
  connect(state => ({
    accountId: currentAccountIdSelector(state),
    story: storySelector(state),
  })),
  injectStyles(styles)
)(HeaderBarButtons)
