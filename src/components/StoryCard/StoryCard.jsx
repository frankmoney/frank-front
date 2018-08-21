import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import StoryPaymentsStats from 'components/StoryPaymentsStats'
import styles from './StoryCard.jss'

const StoryCard = ({
  classes,
  className,
  component: RootElement,
  coverImage,
  paymentsCurrency,
  paymentsCounter,
  paymentsDateRange,
  title,
  description,
  published,
  ...otherProps
}) => (
  <RootElement
    className={cx(classes.storyCard, !coverImage && classes.noImage, className)}
    {...otherProps}
  >
    {coverImage && (
      <div className={classes.coverImageContainer}>
        <img
          className={classes.eventCardImage}
          src={coverImage.thumbs.preview}
          alt="event"
        />
      </div>
    )}
    <div className={classes.textContainer}>
      {!published && <div className={classes.flag}>Draft</div>}
      <div className={classes.title}>{title}</div>
      {paymentsCounter && (
        <StoryPaymentsStats
          className={classes.stats}
          paymentsCurrency={paymentsCurrency}
          paymentsCounter={paymentsCounter}
          paymentsDateRange={paymentsDateRange}
        />
      )}
      {description && <div className={classes.description}>{description}</div>}
    </div>
  </RootElement>
)

StoryCard.propTypes = {
  eventDateId: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  coverImage: PropTypes.shape({ url: PropTypes.string }),
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  participants: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  participationStatus: PropTypes.string,
  hasPlace: PropTypes.bool,
  isParticipationChanging: PropTypes.bool.isRequired,
  onJoin: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  userRoles: PropTypes.arrayOf(PropTypes.string),
  canJoin: PropTypes.bool,
  canLeave: PropTypes.bool,
}

StoryCard.defaultProps = {
  component: 'div',
}

export default injectStyles(styles)(StoryCard)
