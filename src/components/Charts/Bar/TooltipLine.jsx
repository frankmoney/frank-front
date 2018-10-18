// @flow
import React from 'react'
import * as R from 'ramda'
import type { DataKey, LabelFormatter } from 'recharts'
import { formatCurrency } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import IconCircle from 'components/IconCircle'

const styles = theme => ({
  root: {
    ...theme.fontMedium(14, 16),
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  circle: {
    position: 'relative',
    top: 1,
  },
  caption: {
    margin: [0, 16, 0, 10],
  },
})

type Props = {
  classes: Object,
  color: ?string,
  key: ?DataKey,
  labelFormatter: LabelFormatter,
  value: number,
}

export const epsilon = 2 ** -42

const fixMinusZero: number => number = x => (x === -epsilon ? 0 : x)

const formatMoney: number => string = R.pipe(
  fixMinusZero,
  x => ({ value: x, precision: 2 }),
  formatCurrency,
  R.replace('$', '$ '),
  R.replace('– ', '−')
)

const TooltipLine = ({
  classes,
  color,
  key,
  labelFormatter,
  value,
  ...payloadProps
}: Props) => (
  <div className={classes.root} style={{ color }} key={key}>
    <div>
      <IconCircle className={classes.circle} />
      <span className={classes.caption}>{labelFormatter(payloadProps)}</span>
    </div>
    {formatMoney(value)}
  </div>
)

export default injectStyles(styles)(TooltipLine)
