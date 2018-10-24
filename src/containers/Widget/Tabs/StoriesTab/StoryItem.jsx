import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import StoryPaymentsStats from 'components/StoryPaymentsStats'
import styles from './StoryItem.jss'
import type { Props } from './StoryItem.flow'

const StoryItem = ({
  classes,
  classNames: {
    root: rootClassName,
    image: imageClassName,
    withImage: withImageClassName,
    title: titleClassName,
    stats: statsClassName,
    text: textClassName,
  } = {},
  component: RootElement = 'div',
  data: {
    coverImage,
    paymentsCount,
    paymentsDateRange,
    title,
    body: { text },
  },
  ...otherProps
}: Props) => (
  <RootElement
    className={cx(
      classes.root,
      rootClassName,
      coverImage && withImageClassName
    )}
    {...otherProps}
  >
    {coverImage && (
      <div className={cx(classes.image, imageClassName)}>
        <img src={coverImage.thumbs.sized} alt={title} />
      </div>
    )}
    <div className={classes.textContainer}>
      <div className={cx(classes.title, titleClassName)}>{title}</div>
      {paymentsCount > 0 && (
        <StoryPaymentsStats
          classNames={{
            root: cx(classes.statsRoot, statsClassName),
            symbol: classes.statsSymbol,
            counter: classes.statsCounter,
          }}
          paymentsCount={paymentsCount}
          paymentsDateRange={paymentsDateRange}
        />
      )}
      {text && <div className={cx(classes.text, textClassName)}>{text}</div>}
    </div>
  </RootElement>
)

export default injectStyles(styles)(StoryItem)
