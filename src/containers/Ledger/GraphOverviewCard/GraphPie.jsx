import React from 'react'
import cx from 'classnames'
import { MenuItem, Input } from 'material-ui'
import { injectStyles } from '@frankmoney/ui'
import { SelectField } from '@frankmoney/components'
import CategoryLabel from 'components/CategoryLabel'

const styles = theme => ({
  pie: {
    display: 'flex',
    alignItems: 'center',
  },
  pieChart: {
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
  pieLegend: {
    marginLeft: 60,
  },
  legend: {
    ...theme.fontMedium(22, 26),
    '&:not(:first-child)': {
      marginTop: 10,
    },
  },
})

const renderSelectInput = data => `% of total ${data.key}`

const pieCategoryTypes = [{ key: 'income' }, { key: 'spending' }]

class GraphPie extends React.PureComponent {
  state = {}

  render() {
    const { classes, className, categories } = this.props

    return (
      <div className={cx(classes.pie, className)}>
        <div className={classes.pieChart}>
          <SelectField
            name="type"
            value="spending"
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
          >
            <MenuItem key="spending" value="spending">
              spending
            </MenuItem>
            <MenuItem key="income" value="income">
              income
            </MenuItem>
          </SelectField>
        </div>
        <div className={classes.pieLegend}>
          {categories.map(({ name, color }) => (
            <CategoryLabel
              key={name}
              className={classes.legend}
              color={color}
              name={name}
              size={16}
              fontSize={26}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default injectStyles(styles)(GraphPie)
