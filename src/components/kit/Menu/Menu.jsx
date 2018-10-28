import React from 'react'
import Paper from 'components/kit/Paper'
import SelectListBase from 'components/kit/SelectListBase'
import MenuTitle from './MenuTitle'

const Menu = ({
  value,
  onChange,
  defaultValue,
  autoFocus,
  children,
  title,
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
        {title && <MenuTitle>{title}</MenuTitle>}
        {children}
      </Paper>
    )}
  </SelectListBase>
)

export default Menu
