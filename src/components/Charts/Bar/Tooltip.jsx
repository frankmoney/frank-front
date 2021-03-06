// @flow strict-local
import * as R from 'ramda'
import React from 'react'
import { compose, branch, renderNothing } from 'recompose'
import Paper from 'components/kit/Paper'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import type { FormattedBarLabels, JSONString } from 'data/models/barData'
import TooltipLine, {
  type TooltipLinePayload,
  type TooltipLabelFormatter,
} from './TooltipLine'

const styles = theme => ({
  root: {
    padding: [14, 19, 9],
    border: '1px solid rgba(0, 0, 0, 0.02)',
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    ...theme.fontRegular(14, 22),
    color: '#999999',
    marginBottom: 12,
  },
})

type Style = Object // flowlint-line unclear-type:off

type Props = {|
  ...InjectStylesProps,
  //
  label: JSONString,
  labelFormatter: TooltipLabelFormatter,
  payload: Array<TooltipLinePayload>,
  style?: Style,
|}

const Tooltip = ({ classes, label, labelFormatter, payload, style }: Props) => {
  const labels: FormattedBarLabels = JSON.parse(label)
  return (
    <Paper className={classes.root} style={style}>
      <div className={classes.header}>{labels.tooltipLabel}</div>
      {R.addIndex(R.map)((item, index) => (
        <TooltipLine labelFormatter={labelFormatter} key={index} {...item} />
      ))(payload)}
    </Paper>
  )
}

export default compose(
  branch(
    ({ payload, label }) => R.isNil(payload) || R.isNil(label),
    renderNothing
  ),
  injectStyles(styles)
)(Tooltip)
