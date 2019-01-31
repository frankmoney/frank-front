// @flow strict-local
import React from 'react'
import * as R from 'ramda'
import { formatCurrency } from '@frankmoney/components'
import IconCircle from 'components/IconCircle'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

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

export type TooltipLinePayload = {
  dataKey: string,
}

export type TooltipLabelFormatter = TooltipLinePayload => string

type Props = {|
  ...InjectStylesProps,
  ...$Exact<TooltipLinePayload>,
  //
  color?: string,
  key?: string,
  labelFormatter: TooltipLabelFormatter,
  value: number,
|}

export const EPSILON = 2 ** -14

const fixMinusZero = (x: number) => (Math.abs(x) <= EPSILON ? 0 : x)

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
