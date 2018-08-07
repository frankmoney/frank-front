import * as R from 'ramda'
import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { MenuItem, Input } from 'material-ui'
import { injectStyles } from '@frankmoney/ui'
import { SelectField } from '@frankmoney/components'
import CategoryList from 'components/CategoryList'
import Pie from 'components/Charts/Pie'
import { categoricalDataShape } from 'components/Charts/shapes'
import limitCategories from 'utils/limitCategories'
import styles from './PieChart.jss'

const renderSelectInput = ({ key }) => key

const renderMenuItem = ({ key }) => (
  <MenuItem key={key} value={key}>
    {key}
  </MenuItem>
)

const pieCategoryTypes = [{ key: 'income' }, { key: 'spending' }]

class PieChart extends React.PureComponent {
  state = {
    activeKey: null,
    categoryType: 'spending',
  }

  handleChangeCategoryType = event => {
    this.setState({ categoryType: event.target.value })
  }

  handleMouseOver = key => this.setState({ activeKey: key })

  handleMouseOut = () => this.setState({ activeKey: null })

  render() {
    const { classes, className, categories, hideChart, chartSize } = this.props

    const { categoryType } = this.state

    const data = categories[categoryType]
    const limitedCategories = limitCategories(data)
    const { items, other } = limitedCategories
    const pieData = other ? R.append(other, items) : items

    return (
      <div className={cx(classes.root, className)}>
        {!hideChart && (
          <div className={classes.chartContainer}>
            <Pie
              activeKey={this.state.activeKey}
              className={classes.chart}
              data={pieData}
              onMouseEnter={this.handleMouseOver}
              onMouseLeave={this.handleMouseOut}
              size={chartSize}
            />
            <div className={classes.switcher}>
              {'% of total '}
              <SelectField
                classes={{ icon: classes.switcherIcon }}
                name="type"
                value={categoryType}
                values={pieCategoryTypes}
                valueKey="key"
                MenuProps={{ MenuListProps: { className: classes.list } }}
                inputComponent={
                  <Input
                    classes={{
                      root: classes.inputContainer,
                      input: classes.input,
                    }}
                    disableUnderline
                  />
                }
                renderValue={renderSelectInput}
                onChange={this.handleChangeCategoryType}
              >
                {pieCategoryTypes.map(type => renderMenuItem(type))}
              </SelectField>
            </div>
          </div>
        )}
        <CategoryList
          activeKey={this.state.activeKey}
          activeLabelClassName={classes.activeLegendItem}
          className={cx(classes.legend, {
            [classes.highlightedLegend]: this.state.activeKey !== null,
          })}
          iconClassName={classes.legendIcon}
          itemClassName={classes.legendItem}
          limitedCategories={limitedCategories}
          nameClassName={classes.legendItemName}
          onLabelMouseEnter={this.handleMouseOver}
          onLabelMouseLeave={this.handleMouseOut}
          tooltip
          valueClassName={classes.legendItemValue}
          valueUnit="%"
        />
      </div>
    )
  }
}

PieChart.propTypes = {
  categories: PropTypes.arrayOf(categoricalDataShape),
  hideChart: PropTypes.bool.isRequired,
  chartSize: PropTypes.number.isRequired,
}

PieChart.defaultProps = {
  chartSize: 350,
}

export default injectStyles(styles)(PieChart)
