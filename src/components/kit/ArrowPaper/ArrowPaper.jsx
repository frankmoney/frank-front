// @flow
import * as React from 'react'
import cx from 'classnames'
import Paper, { type PaperProps } from 'components/kit/Paper'
import type { PopupAlign, PopupPosition } from 'components/kit/PopupBase'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import Arrow from './Arrow'

type Props = {|
  ...PaperProps,
  ...InjectStylesProps,
  //
  align: PopupAlign,
  arrowProps: Object,
  enableContentOverflow?: boolean,
  children?: React.Node,
  direction: PopupPosition,
|}

const ARROW_WIDTH = 24
const ARROW_HEIGHT = 12
const OFFSET = 18

export const DEFAULT_DIRECTION = 'down'
export const DEFAULT_ALIGN = 'center'

const styles = {
  root: {
    position: 'relative',
    overflow: 'unset',
  },
  content: {},
  contentWithOverflow: {
    borderRadius: 8,
    overflow: 'auto',
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
      left: -ARROW_HEIGHT * 1.5, // +0.5 из-за поворота
      transform: 'rotate(-90deg)',
      filter: `drop-shadow(0px -3px 2px rgba(0, 0, 0, 0.1))`,
    },
  },
  right: {
    '& $arrow': {
      right: -ARROW_HEIGHT * 1.5, // +0.5 из-за поворота
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
}

const ArrowPaper = ({
  children,
  classes,
  direction,
  align,
  arrowProps,
  className,
  enableContentOverflow,
  theme,
  ...otherProps
}: Props) => (
  <Paper
    type="arrowDropdown"
    className={cx(classes.root, classes[direction], classes[align], className)}
    {...otherProps}
  >
    <div
      className={cx(
        classes.content,
        enableContentOverflow && classes.contentWithOverflow
      )}
    >
      {children}
    </div>
    <Arrow className={classes.arrow} {...arrowProps} />
  </Paper>
)

ArrowPaper.defaultProps = {
  direction: DEFAULT_DIRECTION,
  align: DEFAULT_ALIGN,
}

export default injectStyles(styles)(ArrowPaper)
