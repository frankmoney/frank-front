// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import Paper from 'components/kit/Paper'
import Arrow from './arrow.svg'

type Props = {
  direction: 'up' | 'left' | 'right' | 'down',
  align: 'center' | 'start' | 'end',
  arrowRef: Element => void,
}

const ARROW_WIDTH = 24
const ARROW_HEIGHT = 12
const OFFSET = 18

const styles = theme => ({
  root: {
    position: 'relative',
  },
  arrow: {
    position: 'absolute',
    width: ARROW_WIDTH,
    height: ARROW_HEIGHT,
    pointerEvents: 'none',
    fill: 'currentColor',
    color: 'white',
  },
  up: {
    '& $arrow': {
      top: -ARROW_HEIGHT,
      filter: `none`,
    },
  },
  down: {
    '& $arrow': {
      bottom: -ARROW_HEIGHT,
      transform: 'rotate(180deg)',
      filter: `drop-shadow(0px -5px 3px rgba(0, 0, 0, 0.12));`,
    },
  },
  left: {
    '& $arrow': {
      left: -ARROW_HEIGHT * 1.5, // +0.5 изза поворота
      transform: 'rotate(-90deg)',
      filter: `drop-shadow(0px -3px 2px rgba(0, 0, 0, 0.1))`,
    },
  },
  right: {
    '& $arrow': {
      right: -ARROW_HEIGHT * 1.5, // +0.5 изза поворота
      transform: 'rotate(90deg)',
      filter: `drop-shadow(0px -3px 2px rgba(0, 0, 0, 0.1))`,
    },
  },
  center: {
    '&$up $arrow, &$down $arrow': {
      left: `calc(50% - ${ARROW_WIDTH / 2}px)`,
    },
    '&$left $arrow, &$right $arrow': {
      top: `calc(50% - ${ARROW_HEIGHT / 2}px)`,
    },
  },
  start: {
    '&$up $arrow, &$down $arrow': {
      left: OFFSET,
    },
    '&$left $arrow, &$right $arrow': {
      top: OFFSET,
    },
  },
  end: {
    '&$up $arrow, &$down $arrow': {
      right: OFFSET,
    },
    '&$left $arrow, &$right $arrow': {
      bottom: OFFSET,
    },
  },
})

const ArrowPaper = ({
  children,
  classes,
  direction,
  align,
  arrowRef,
  arrowProps,
  className,
  theme,
  ...otherProps
}: Props) => (
  <Paper
    type="popup"
    className={cx(classes.root, classes[direction], classes[align], className)}
    {...otherProps}
  >
    {children}
    <Arrow ref={arrowRef} className={classes.arrow} {...arrowProps} />
  </Paper>
)

ArrowPaper.defaultProps = {
  direction: 'down',
  align: 'center',
}

export default injectStyles(styles)(ArrowPaper)
