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
  Breadcrumbs,
  BreadcrumbsItem,
  BreadcrumbsItemLink,
  FixedHeader,
} from '@frankmoney/components'
import AreaSpinner from 'components/AreaSpinner'
import StoryPaymentsStats from 'components/StoryPaymentsStats'
import StoryPayments from 'components/StoryPayments'
import { type AccountId } from 'data/models/account'
import { type Story as StoryProps } from 'data/models/stories'
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

type Props = {|
  ...InjectStylesProps,
  //
  accountId: AccountId,
  story: StoryProps,
  editorState?: Object, // flowlint-line unclear-type:off
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
        {// flowlint-next-line sketchy-number-and:off
        paymentsCount && (
          <StoryPaymentsStats
            className={classes.stats}
            paymentsCount={paymentsCount}
            paymentsDateRange={paymentsDateRange}
          />
        )}
        {editorState && (
          <Editor className={classes.text} editorState={editorState} readOnly />
        )}
        {// flowlint-next-line sketchy-number-and:off
        paymentsCount && <StoryPayments payments={payments} readOnly />}
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
