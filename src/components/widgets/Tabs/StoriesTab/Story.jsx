// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import StoryPaymentsStats from 'components/StoryPaymentsStats'
import { type Story as StoryProps } from 'data/models/stories'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const maxLines = (lineCount, lineHeight) => ({
  display: '-webkit-box',
  maxHeight: lineHeight * lineCount,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'break-word',
  '-webkit-box-orient': 'vertical',
  '-webkit-line-clamp': lineCount,
})

const styles = theme => ({
  root: {
    marginBottom: 35,
    textDecoration: 'none',
  },
  imageContainer: {
    marginBottom: 12,
  },
  image: {
    width: '100%',
    borderRadius: props => props.imageBorderRadius,
  },
  title: {
    ...theme.fontSemibold(22, 28),
    ...maxLines(3, 28),
    color: '#252B43',
    marginBottom: 5,
  },
  stats: {
    ...theme.fontRegular(16, 30),
    fontSize: 16,
    marginBottom: 5,
    alignItems: 'center',
  },
  statsCounter: {
    marginRight: 10,
  },
  statsSymbol: {
    width: 22,
    height: 22,
    margin: [-1, 2, 0, -5],
  },
  text: {
    color: '#9295A1',
    ...theme.fontRegular(16, 24),
    ...maxLines(3, 24),
  },
})

export type ImageBorderRadius = number | [Array<number>]

type Props = {|
  ...InjectStylesProps,
  ...StoryProps,
  //
  component: React.ElementType,
  imageBorderRadius: ImageBorderRadius,
  imageClassName?: string,
  statsClassName?: string,
  symbolClassName?: string,
  titleClassName?: string,
|}

const Story = ({
  classes,
  className,
  component: Root,
  //
  cover,
  imageClassName,
  paymentsCount,
  paymentsDateRange,
  statsClassName,
  symbolClassName,
  text,
  title,
  titleClassName,
  // omit
  body,
  id,
  imageBorderRadius,
  ...props
}: Props) => (
  <Root className={cx(classes.root, className)} {...props}>
    {cover && (
      <div className={cx(classes.imageContainer, imageClassName)}>
        <img
          className={classes.image}
          src={cover.thumbs.sized}
          alt="Story cover"
        />
      </div>
    )}
    <div className={cx(classes.title, titleClassName)}>{title}</div>
    {paymentsCount > 0 && (
      <StoryPaymentsStats
        className={cx(classes.stats, statsClassName)}
        paymentsCount={paymentsCount}
        paymentsDateRange={paymentsDateRange}
        counterClassName={classes.statsCounter}
        symbolClassName={cx(classes.statsSymbol, symbolClassName)}
      />
    )}
    {text && <div className={classes.text}>{text}</div>}
  </Root>
)

Story.defaultProps = {
  component: 'div',
  imageBorderRadius: 5,
}

export default injectStyles(styles)(Story)
