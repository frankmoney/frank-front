import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import { compose, lifecycle, branch, renderComponent } from 'recompose'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { injectStyles } from '@frankmoney/ui'
import { PageLoader, FixedHeader } from '@frankmoney/components'
import StoryPaymentsStats from 'components/StoryPaymentsStats'
import StoryPayments from 'components/StoryPayments'
import { isLoadedSelector, storySelector } from './selectors'
import ACTIONS from './actions'
import styles from './StoryPreview.jss'
import HeaderBarButtons from './HeaderBarButtons'

const StoryPreview = ({
  classes,
  className,
  storyData: {
    coverImage,
    payments,
    paymentsCurrency,
    paymentsCounter,
    paymentsDateRange,
    title,
    description,
    publishedDate,
  },
}) => (
  <div className={cx(classes.storyPreviewPage, className)}>
    <FixedHeader>
      <HeaderBarButtons publishedDate={publishedDate} />
    </FixedHeader>
    <div className={classes.container}>
      {coverImage && (
        <div className={classes.coverImageContainer}>
          <img
            className={classes.eventCardImage}
            src={coverImage.thumbs.preview}
            alt="story cover"
          />
        </div>
      )}
      <div className={classes.textContainer}>
        {title && <div className={classes.title}>{title}</div>}
        {paymentsCounter && (
          <StoryPaymentsStats
            className={classes.stats}
            paymentsCurrency={paymentsCurrency}
            paymentsCounter={paymentsCounter}
            paymentsDateRange={paymentsDateRange}
          />
        )}
        {description && (
          <div className={classes.description}>{description}</div>
        )}
        {paymentsCounter && <StoryPayments payments={payments} readOnly />}
      </div>
    </div>
  </div>
)

const mapStateToProps = createStructuredSelector({
  isLoaded: isLoadedSelector,
  storyData: storySelector,
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
  branch(props => !props.isLoaded, renderComponent(PageLoader)),
  injectStyles(styles, { fixedGrid: true })
)(StoryPreview)
