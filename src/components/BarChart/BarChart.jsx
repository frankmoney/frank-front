import React from 'react'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'

const styles = {}

const BarChart = ({ classes, className, data }) => {
  const s = '[graph here]'
  return <div className={className}>{s}</div>
}

BarChart.propTypes = {}

export default injectStyles(styles)(BarChart)
