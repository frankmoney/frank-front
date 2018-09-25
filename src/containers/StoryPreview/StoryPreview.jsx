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
  story: {
    coverImage,
    payments,
    paymentsCount,
    paymentsDateRange,
    title,
    body: { text },
  },
}) => (
  <div className={cx(classes.storyPreviewPage, className)}>
    <FixedHeader>
      <HeaderBarButtons />
    </FixedHeader>
    <div className={classes.container}>
      {coverImage && (
        <div className={classes.imageContainer}>
          <img
            className={classes.coverImage}
            src={coverImage.thumbs.sized}
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
  branch(props => !props.isLoaded, renderComponent(PageLoader)),
  injectStyles(styles, { fixedGrid: true })
)(StoryPreview)
