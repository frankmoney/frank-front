import React from 'react'
import cx from 'classnames'
import { MenuItem, Input } from 'material-ui'
import { injectStyles } from '@frankmoney/ui'
import { SelectField } from '@frankmoney/components'
import CategoryList from 'components/CategoryList'

const styles = theme => ({
  pie: {
    display: 'flex',
    alignItems: 'center',
  },
  chart: {
    marginLeft: 30,
    width: 350,
    height: 350,
    borderRadius: '100%',
    border: '3px dashed',
    borderColor: [
      theme.colors.purple,
      theme.colors.green,
      theme.colors.brightBlue,
      theme.colors.magenta,
    ],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switcher: {
    alignItems: 'baseline',
  },
  input: {
    ...theme.fontMedium(18, 18),
    margin: 0,
    padding: [0, 20, 0, 0],
    minHeight: 'auto',
  },
  legend: {
    marginLeft: 60,
  },
  legendItem: {
    '&:not(:first-child)': {
      marginTop: 10,
    },
  },
  legendItemName: {
    ...theme.fontMedium(22, 26),
  },
  legendItemCounter: {
    ...theme.fontRegular(22, 26),
  },
  legendTooltipItem: {
    display: 'flex',
    '&:not(:first-child)': {
      marginTop: 12,
    },
  },
  legendTooltipItemName: {
    flex: [1, 1],
    paddingRight: 40,
    ...theme.fontMedium(14, 16),
  },
  legendTooltipItemCounter: {
    flex: [1, 1],
    textAlign: 'right',
    ...theme.fontMedium(14, 16),
    color: 'black !important',
  },
})

const renderSelectInput = ({ key }) => key

const renderMenuItem = ({ key }) => (
  <MenuItem key={key} value={key}>
    {key}
  </MenuItem>
)

const pieCategoryTypes = [{ key: 'income' }, { key: 'spending' }]

class GraphPie extends React.PureComponent {
  state = {
    categoryType: 'spending',
  }

  handleChangeCategoryType = event => {
    this.setState({ categoryType: event.target.value })
  }

  render() {
    const { classes, className, categories } = this.props

    const { categoryType } = this.state

    return (
      <div className={cx(classes.pie, className)}>
        <div className={classes.chart}>
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
          className={classes.legend}
          classes={{
            item: classes.legendItem,
            itemName: classes.legendItemName,
            itemCounter: classes.legendItemCounter,
            tooltipItem: classes.legendTooltipItem,
            tooltipItemName: classes.legendTooltipItemName,
            tooltipItemCounter: classes.legendTooltipItemCounter,
          }}
          categories={categories}
          counterUnit="%"
        />
      </div>
    )
  }
}

export default injectStyles(styles)(GraphPie)
