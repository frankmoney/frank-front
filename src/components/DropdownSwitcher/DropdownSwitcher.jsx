import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { MenuItem, Input } from 'material-ui'
import { SelectField } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'

const styles = theme => ({
  root: {
    ...theme.fontRegular(18, 24),
    alignItems: 'center',
    textAlign: 'center',
  },
  icon: {
    right: -2,
    top: 1,
  },
  inputRoot: {
    fontSize: 'inherit',
    lineHeight: 'inherit',
  },
  input: {
    fontSize: 'inherit',
    fontWeight: 500,
    lineHeight: 'inherit',
    margin: 0,
    minHeight: 'auto',
    padding: [0, 18, 0, 0],
  },
  menuList: {},
})

const renderSelectInput = ({ key }) => key

const renderMenuItem = ({ key }) => (
  <MenuItem key={key} value={key}>
    {key}
  </MenuItem>
)

const DropdownSwitcher = ({
  classes,
  className,
  label,
  onChange,
  value,
  values,
}) => (
  <div className={cx(classes.root, className)}>
    {!!label && `${label} `}
    <SelectField
      classes={{ icon: classes.icon }}
      name="type"
      value={value}
      values={values}
      valueKey="key"
      MenuProps={{
        MenuListProps: { className: classes.menuList },
      }}
      inputComponent={
        <Input
          classes={{
            root: classes.inputRoot,
            input: classes.input,
          }}
          disableUnderline
        />
      }
      renderValue={renderSelectInput}
      onChange={onChange}
    >
      {values.map(renderMenuItem)}
    </SelectField>
  </div>
)

DropdownSwitcher.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string.isRequired })
  ).isRequired,
}

export default injectStyles(styles)(DropdownSwitcher)
