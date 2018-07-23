import * as R from 'ramda'
import React from 'react'
import cx from 'classnames'
import { MenuItem, Input } from 'material-ui'
import { injectStyles } from '@frankmoney/ui'
import { SelectField } from '@frankmoney/components'
import CategoryList from 'components/CategoryList'
import Pie from 'components/Charts/Pie'
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
    categoryType: 'spending',
  }

  handleChangeCategoryType = event => {
    this.setState({ categoryType: event.target.value })
  }

  render() {
    const { classes, className, categories } = this.props

    const { categoryType } = this.state

    const pieData = R.map(
      ({ color, counter, name }) => ({
        fill: color,
        key: name,
        value: counter,
      }),
      categories
    )

    return (
      <div className={cx(classes.root, className)}>
        <Pie className={classes.chart} data={pieData} activeIndex={null} />
        <div className={classes.switcherRoot}>
          <div className={classes.switcher}>
            {'% of total '}
            <SelectField
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
        <CategoryList
          categories={categories}
          className={classes.legend}
          counterClassName={classes.legendItemCounter}
          counterUnit="%"
          iconClassName={classes.legendIcon}
          itemClassName={classes.legendItem}
          nameClassName={classes.legendItemName}
          tooltip
        />
      </div>
    )
  }
}

export default injectStyles(styles)(PieChart)
