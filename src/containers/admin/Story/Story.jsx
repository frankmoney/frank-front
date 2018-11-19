// @flow strict-local
import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import { compose, lifecycle, branch, renderComponent } from 'recompose'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FixedHeader } from '@frankmoney/components'
import AreaSpinner from 'components/AreaSpinner'
import StoryPaymentsStats, {
  type StoryPaymentsStatsProps,
} from 'components/StoryPaymentsStats'
import StoryPayments, { type PaymentList } from 'components/StoryPayments'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import { isLoadedSelector, storySelector } from './selectors'
import ACTIONS from './actions'
import HeaderBarButtons from './HeaderBarButtons'
import styles from './Story.jss'

type StoryProps = {|
  draft: {|
    title: string,
    cover: Object, // flowlint-line unclear-type:warn
    body: {| text: string |},
    payments: PaymentList,
    ...StoryPaymentsStatsProps,
  |},
|}

type Props = {|
  ...InjectStylesProps,
  //
  story: StoryProps,
|}

const Story = ({
  classes,
  className,
  story: {
    draft: {
      title,
      cover,
      body: { text },
      payments,
      paymentsCount,
      paymentsDateRange,
    },
  },
}: Props) => (
  <div className={cx(classes.storyPreviewPage, className)}>
    <FixedHeader>
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
        {text && <div className={classes.text}>{text}</div>}
        {paymentsCount > 0 && <StoryPayments payments={payments} readOnly />}
      </div>
    </div>
  </div>
)

const mapStateToProps = createStructuredSelector({
  isLoaded: isLoadedSelector,
  story: storySelector,
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
