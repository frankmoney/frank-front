import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
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

export const epsilon = 2 ** -42

const fixMinusZero = x => (x === -epsilon ? 0 : x)

const formatMoney = R.pipe(
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
}) => (
  <div className={classes.root} style={{ color }} key={key}>
    <div>
      <IconCircle className={classes.circle} />
      <span className={classes.caption}>{labelFormatter(payloadProps)}</span>
    </div>
    {formatMoney(value)}
  </div>
)

TooltipLine.propTypes = {
  key: PropTypes.string,
  labelFormatter: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
}

export default injectStyles(styles)(TooltipLine)
