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
  title,
  cover,
  text,
  published,
  paymentsCount,
  paymentsDateRange,
  paymentsCurrency,
  ...otherProps
}) => (
  <RootElement
    className={cx(classes.storyCard, !cover && classes.noImage, className)}
    {...otherProps}
  >
    {cover && (
      <img
        className={classes.coverImage}
        src={cover.thumbs.sized}
        alt="event"
      />
    )}
    <div className={classes.textContainer}>
      {!published && <div className={classes.flag}>Draft</div>}
      <div className={classes.title}>{title}</div>
      {paymentsCount > 0 && (
        <StoryPaymentsStats
          className={classes.stats}
          paymentsCurrency={paymentsCurrency}
          paymentsCount={paymentsCount}
          paymentsDateRange={paymentsDateRange}
        />
      )}
      {text && <div className={classes.text}>{text}</div>}
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
