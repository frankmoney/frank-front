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
    marginBottom: 28,
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    flex: [1, 0],
  },
  image: {
    width: '100%',
    borderRadius: 5,
    marginBottom: 12,
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

type Props = {|
  ...InjectStylesProps,
  ...StoryProps,
  //
  component: React.ElementType,
|}

const Story = ({
  classes,
  className,
  component: Root,
  //
  text,
  cover,
  paymentsCount,
  paymentsDateRange,
  title,
  // omit
  body,
  id,
  ...props
}: Props) => (
  <Root className={cx(classes.root, className)} {...props}>
    {cover && (
      <img
        className={classes.image}
        src={cover.thumbs.sized}
        alt="Story cover"
      />
    )}
    <div className={classes.title}>{title}</div>
    {paymentsCount > 0 && (
      <StoryPaymentsStats
        className={classes.stats}
        paymentsCount={paymentsCount}
        paymentsDateRange={paymentsDateRange}
        counterClassName={classes.statsCounter}
        symbolClassName={classes.statsSymbol}
      />
    )}
    {text && <div className={classes.text}>{text}</div>}
  </Root>
)

Story.defaultProps = {
  component: 'div',
}

export default injectStyles(styles)(Story)
