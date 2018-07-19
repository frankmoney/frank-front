import * as R from 'ramda'
import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { Cell, PieChart as ReChart, Pie } from 'recharts'
import { injectStyles } from '@frankmoney/ui'

const SIZE = 350
const THICCNESS = 5
const DEFAULT_COLOR = '#B3B3B3'

const styles = {
  root: {
    display: 'inline-flex',
  },
  ring: {
    cursor: 'pointer',
  },
}

const PieSlice = ({ fill = DEFAULT_COLOR }) => <Cell fill={fill} />

const FatPieSlice = ({ fill = DEFAULT_COLOR, active }) => (
  <Cell fill={active ? fill : 'none'} />
)

export const injectIndex = R.addIndex(R.map)(R.flip(R.assoc('index')))

const injectActive = current => item =>
  R.assoc('active', current === null || R.propEq('index', current, item), item)

class PieChart extends React.Component {
  state = {
    activeIndex: null,
    showTooltip: false,
  }

  handlePieEnter = (data, index) => {
    this.setState({ activeIndex: index, showTooltip: true })
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(index)
    }
  }

  handlePieLeave = () => {
    this.setState({ activeIndex: null, showTooltip: false })
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave()
    }
  }

  render() {
    const { activeIndex, classes, className, data, size, onClick } = this.props
    const outerRadius = size / 2
    const innerRadius = outerRadius - THICCNESS

    const indexedData = injectIndex(data)
    const currentIndex =
      activeIndex === null ? this.state.activeIndex : activeIndex
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
            nameKey="key"
            outerRadius={outerRadius}
            paddingAngle={0.25}
            startAngle={-270}
          >
            {R.map(PieSlice, data)}
          </Pie>
          <Pie
            className={classes.ring}
            data={data}
            dataKey="value"
            endAngle={-630}
            innerRadius={innerRadius - 15}
            isAnimationActive={false}
            nameKey="key"
            onMouseEnter={this.handlePieEnter}
            onMouseLeave={this.handlePieLeave}
            opacity={0.1}
            outerRadius={outerRadius}
            paddingAngle={0.25}
            startAngle={-270}
          >
            {R.map(
              R.pipe(
                injectActive(currentIndex),
                FatPieSlice
              ),
              indexedData
            )}
          </Pie>
        </ReChart>
      </div>
    )
  }
}

PieChart.propTypes = {
  activeIndex: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.number,
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
