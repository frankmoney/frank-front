import React from 'react'
import Paper from 'components/kit/Paper'
import SelectListBase from 'components/kit/SelectListBase'

const Menu = ({
  value,
  onChange,
  defaultValue,
  autoFocus,
  children,
  ...props
}) => (
  <SelectListBase
    defaultValue={defaultValue}
    value={value}
    onChange={onChange}
    autoFocus={autoFocus}
  >
    {({ getContainerProps }) => (
      <Paper type="list" {...getContainerProps(props)}>
        {children}
      </Paper>
    )}
  </SelectListBase>
)

export default Menu
