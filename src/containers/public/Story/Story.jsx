// @flow
import React from 'react'
import cx from 'classnames'
import { compose, lifecycle, branch, renderComponent } from 'recompose'
import Helmet from 'react-helmet'
import { Page404 as NotFound } from '@frankmoney/components'
import { createRouteUrl } from '@frankmoney/utils'
import AreaSpinner from 'components/AreaSpinner'
import CurrencyProvider from 'components/CurrencyProvider'
import StoryPayments from 'components/StoryPayments'
import StoryPaymentsStats from 'components/StoryPaymentsStats'
import reconnect from 'utils/reconnect'
import { injectStyles } from 'utils/styles'
import { BASE_TITLE, ROUTES } from 'const'
import ShareButtons from 'components/common/ShareButtons'
import Editor from 'components/kit/Editor'
import StoryHeader from './StoryHeader'
import {
  accountSelector,
  isLoadedSelector,
  isPrivateSelector,
  storyEditorStateSelector,
  storySelector,
} from './selectors'
import ACTIONS from './actions'
import styles from './Story.jss'

const Story = ({
  classes,
  className,
  account: { id: accountId, currencyCode },
  story: {
    id: storyId,
    title,
    cover,
    payments,
    paymentsCount,
    paymentsDateRange,
  },
  editorState,
}) => (
  <div className={cx(classes.storyPage, className)}>
    <CurrencyProvider code={currencyCode}>
      <Helmet title={BASE_TITLE} />
      <StoryHeader />
      <div className={classes.container}>
        <div className={classes.prelude}>
          {title && <div className={classes.title}>{title}</div>}
          {paymentsCount > 0 && (
            <StoryPaymentsStats
              className={classes.stats}
              paymentsCount={paymentsCount}
              paymentsDateRange={paymentsDateRange}
            />
          )}
          <ShareButtons
            className={classes.share}
            url={createRouteUrl(ROUTES.account.stories.idRoot, {
              accountId,
              storyId,
            })}
            small
          />
        </div>
        {cover && (
          <div className={classes.imageContainer}>
            <img
              className={classes.coverImage}
              src={cover.thumbs.sized}
              alt="story cover"
            />
          </div>
        )}
        {editorState && (
          <Editor className={classes.text} editorState={editorState} readOnly />
        )}
        {paymentsCount > 0 && (
          <StoryPayments
            className={classes.payments}
            payments={payments}
            readOnly
          />
        )}
      </div>
    </CurrencyProvider>
  </div>
)

export default compose(
  reconnect(
    {
      account: accountSelector,
      editorState: storyEditorStateSelector,
      isLoaded: isLoadedSelector,
      isPrivate: isPrivateSelector,
      story: storySelector,
    },
    {
      load: ACTIONS.load,
      leave: ACTIONS.leave,
    }
  ),
  lifecycle({
    componentWillMount() {
      if (!this.props.isLoaded) {
        this.props.load({
          accountId: this.props.accountId,
          storyId: this.props.storyId,
        })
      }
    },
    componentWillUnmount() {
      this.props.leave()
    },
  }),
  branch(props => props.isPrivate, renderComponent(NotFound)),
  branch(props => !props.isLoaded, renderComponent(AreaSpinner)),
  injectStyles(styles, { fixedGrid: true })
)(Story)
