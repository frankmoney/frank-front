// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import DashedLine from './DashedLine'

const BASE_LINE_COLOR = '#E5E5E5'
const CLIPPING_FIX = 1

const styles = {
  root: {
    position: 'absolute',
    top: -CLIPPING_FIX,
  },
}

type Props = {
  classes: Object,
  className: ?string,
  dual: boolean,
  height: number,
  hideBaseLine: boolean,
  steps: number,
  width: number,
}

const Grid = ({
  classes,
  className,
  dual,
  height,
  hideBaseLine,
  steps,
  width,
}: Props) => {
  const baseLine = dual ? Math.floor(height / 2) : height
  const dashedLines = []
  const step = Math.floor(baseLine / steps)
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= steps; i++) {
    dashedLines.push(
      <DashedLine
        key={i}
        y={baseLine - i * step + CLIPPING_FIX}
        width={width}
      />
    )
    if (dual) {
      dashedLines.push(
        <DashedLine
          key={steps + i}
          y={baseLine + i * step + CLIPPING_FIX}
          width={width}
        />
      )
    }
  }

  return (
    <svg
      width={width}
      height={height + 2 * CLIPPING_FIX}
      className={cx(classes.root, className)}
    >
      {dashedLines}
      {!hideBaseLine && (
        <line
          x1="0"
          x2={width}
          y1={baseLine}
          y2={baseLine}
          strokeWidth={1}
          stroke={BASE_LINE_COLOR}
        />
      )}
    </svg>
  )
}

Grid.defaultProps = {
  dual: false,
  hideBaseLine: false,
  steps: 4,
}

export default injectStyles(styles)(Grid)
