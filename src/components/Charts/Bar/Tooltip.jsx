// @flow
import * as R from 'ramda'
import React from 'react'
import type { TooltipProps } from 'recharts'
import Paper from 'components/kit/Paper'
import { injectStyles } from 'utils/styles'
import TooltipLine from './TooltipLine'

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

type Props = TooltipProps

const Tooltip = ({ classes, labelFormatter, label, payload, style }: Props) => (
  <Paper className={classes.root} style={style}>
    <div className={classes.header}>{label}</div>
    {R.addIndex(R.map)((item, index) => (
      <TooltipLine labelFormatter={labelFormatter} key={index} {...item} />
    ))(payload)}
  </Paper>
)

export default injectStyles(styles)(Tooltip)
