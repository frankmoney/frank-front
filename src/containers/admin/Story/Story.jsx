// @flow strict-local
import React from 'react'
import * as R from 'ramda'
import { createRouteUrl } from '@frankmoney/utils'
import cx from 'classnames'
import { compose, lifecycle, branch, renderComponent } from 'recompose'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  BreadcrumbsItem,
  BreadcrumbsItemLink,
  FixedHeader,
} from '@frankmoney/components'
import Breadcrumbs from 'components/Breadcrumbs'
import AreaSpinner from 'components/AreaSpinner'
import StoryPaymentsStats, {
  type StoryPaymentsStatsProps,
} from 'components/StoryPaymentsStats'
import StoryPayments, { type PaymentList } from 'components/StoryPayments'
import { ROUTES } from 'const'
import { currentAccountIdSelector } from 'redux/selectors/user'
import { formatFullDate } from 'utils/datesLight'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import Editor from 'components/kit/Editor'
import {
  isLoadedSelector,
  storySelector,
  storyEditorStateSelector,
} from './selectors'
import ACTIONS from './actions'
import HeaderBarButtons from './HeaderBarButtons'
import styles from './Story.jss'

type StoryProps = {|
  title?: string,
  cover?: {| thumbs: { sized: string } |},
  body: {| text?: string |},
  payments: PaymentList,
  ...StoryPaymentsStatsProps,
|}

type Props = {|
  ...InjectStylesProps,
  //
  story: StoryProps,
|}

const Story = ({
  classes,
  className,
  accountId,
  story: {
    publishedAt,
    title,
    cover,
    payments,
    paymentsCount,
    paymentsDateRange,
  },
  editorState,
}: Props) => (
  <div className={cx(classes.storyPreviewPage, className)}>
    <FixedHeader>
      <Breadcrumbs>
        <BreadcrumbsItemLink
          to={createRouteUrl(ROUTES.account.stories.root, { accountId })}
        >
          Stories
        </BreadcrumbsItemLink>
        <BreadcrumbsItem>
          {publishedAt ? (
            <>
              Published story&nbsp;
              <span className={classes.publicationDate}>
                {formatFullDate(publishedAt)}
              </span>
            </>
          ) : (
            'Draft'
          )}
        </BreadcrumbsItem>
      </Breadcrumbs>
      <HeaderBarButtons />
    </FixedHeader>
    <div className={classes.container}>
      {cover && (
        <div className={classes.imageContainer}>
          <img
            className={classes.coverImage}
            src={cover.thumbs.sized}
            alt="story cover"
          />
        </div>
      )}
      <div className={classes.textContainer}>
        {title && <div className={classes.title}>{title}</div>}
        {paymentsCount > 0 && (
          <StoryPaymentsStats
            className={classes.stats}
            paymentsCount={paymentsCount}
            paymentsDateRange={paymentsDateRange}
          />
        )}
        {editorState && (
          <Editor className={classes.text} editorState={editorState} readOnly />
        )}
        {paymentsCount > 0 && <StoryPayments payments={payments} readOnly />}
      </div>
    </div>
  </div>
)

const mapStateToProps = createStructuredSelector({
  isLoaded: isLoadedSelector,
  accountId: currentAccountIdSelector,
  story: storySelector,
  editorState: storyEditorStateSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    load: ACTIONS.load,
    leave: ACTIONS.leave,
  },
])

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentWillMount() {
      if (!this.props.isLoaded) {
        this.props.load(this.props.storyId)
      }
    },
    componentWillUnmount() {
      this.props.leave()
    },
  }),
  branch(props => !props.isLoaded, renderComponent(AreaSpinner)),
  injectStyles(styles, { fixedGrid: true })
)(Story)
