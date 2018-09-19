import React from 'react'
import PropTypes from 'prop-types'

const DashedLine = ({ y, width }) => (
  <line
    x1="0"
    x2={width}
    y1={y}
    y2={y}
    stroke="#EBEBEB"
    strokeWidth={1}
    strokeDasharray="2"
  />
)

DashedLine.propTypes = {
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}

export default DashedLine
