import * as R from 'ramda'
import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { Cell, PieChart as ReChart, Pie } from 'recharts'
import { injectStyles } from '@frankmoney/ui'

const DEFAULT_COLOR = '#B3B3B3'
const INNER_RING_THICCNESS = 15
const RING_THICCNESS = 5
const SEGMENTS_PADDING_ANGLE = 0.25
const SIZE = 350

const styles = {
  root: {
    display: 'inline-flex',
  },
  ring: {
    cursor: 'pointer',
  },
  innerRing: {
    opacity: 0.1,
  },
  pizzaSlice: {
    // opacity: 0, // not really needed
  },
}

const PieSlice = ({ color = DEFAULT_COLOR, key }) => (
  <Cell fill={color} key={key} />
)

const FatPieSlice = ({ color = DEFAULT_COLOR, active, key }) => (
  <Cell fill={active ? color : 'none'} key={key} />
)

const injectActive = current => item =>
  R.assoc('active', current === null || R.propEq('key', current, item), item)

class PieChart extends React.Component {
  state = {
    activeKey: null,
    showTooltip: false,
  }

  handlePieEnter = (data, key) => {
    this.setState({ activeKey: key, showTooltip: true })
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(key)
    }
  }

  handlePieLeave = () => {
    this.setState({ activeKey: null, showTooltip: false })
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave()
    }
  }

  render() {
    const { activeKey, classes, className, data, size, onClick } = this.props
    const outerRadius = size / 2
    const innerRadius = outerRadius - RING_THICCNESS

    const currentKey = activeKey === null ? this.state.activeKey : activeKey
    return (
      <div className={cx(classes.root, className)}>
        <ReChart
          height={size}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          width={size}
          onClick={onClick}
        >
          <Pie
            className={classes.ring}
            data={data}
            dataKey="value"
            endAngle={-630}
            innerRadius={innerRadius}
            isAnimationActive={false}
            nameKey="name"
            outerRadius={outerRadius}
            paddingAngle={SEGMENTS_PADDING_ANGLE}
            startAngle={-270}
          >
            {R.map(PieSlice, data)}
          </Pie>
          <Pie
            className={cx(classes.ring, classes.innerRing)}
            data={data}
            dataKey="value"
            endAngle={-630}
            innerRadius={innerRadius - INNER_RING_THICCNESS}
            isAnimationActive={false}
            nameKey="name"
            outerRadius={outerRadius}
            paddingAngle={SEGMENTS_PADDING_ANGLE}
            startAngle={-270}
          >
            {R.map(
              R.pipe(
                injectActive(currentKey),
                FatPieSlice
              ),
              data
            )}
          </Pie>
          <Pie
            className={classes.pizzaSlice}
            data={data}
            dataKey="value"
            endAngle={-630}
            innerRadius={0}
            onMouseEnter={this.handlePieEnter}
            onMouseLeave={this.handlePieLeave}
            opacity={0}
            outerRadius={outerRadius}
            paddingAngle={SEGMENTS_PADDING_ANGLE}
            startAngle={-270}
          />
        </ReChart>
      </div>
    )
  }
}

PieChart.propTypes = {
  activeKey: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      name: PropTypes.string,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  size: PropTypes.number.isRequired,
}

PieChart.defaultProps = {
  size: SIZE,
}

export default injectStyles(styles)(PieChart)
