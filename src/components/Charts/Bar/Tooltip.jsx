// @flow
import * as R from 'ramda'
import React from 'react'
import Paper from 'components/kit/Paper'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import TooltipLine, {
  type TooltipLinePayload,
  type TooltipLineFormatter,
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

type Style = Object

type Props = {|
  ...InjectStylesProps,
  //
  label?: string,
  lineFormatter: TooltipLineFormatter,
  payload: Array<TooltipLinePayload>,
  style?: Style,
|}

const Tooltip = ({ classes, lineFormatter, label, payload, style }: Props) =>
  payload ? (
    <Paper className={classes.root} style={style}>
      <div className={classes.header}>{label}</div>
      {R.addIndex(R.map)((item, index) => (
        <TooltipLine labelFormatter={lineFormatter} key={index} {...item} />
      ))(payload)}
    </Paper>
  ) : null

export default injectStyles(styles)(Tooltip)
