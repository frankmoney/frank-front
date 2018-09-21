import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import { Paper } from '@frankmoney/components'
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

const Tooltip = ({
  classes,
  labelFormatter,
  label, // passed by the the chart
  payload, // passed by the the chart
  style, // passed by the the chart
}) => (
  <Paper className={classes.root} style={style}>
    <div className={classes.header}>{label}</div>
    {R.addIndex(R.map)((item, index) => (
      <TooltipLine labelFormatter={labelFormatter} key={index} {...item} />
    ))(payload)}
  </Paper>
)

Tooltip.propTypes = {
  labelFormatter: PropTypes.func.isRequired,
}

export default injectStyles(styles)(Tooltip)
