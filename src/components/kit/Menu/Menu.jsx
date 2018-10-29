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
  style,
  title,
  maxVisibleItems,
  multiple,
  ...props
}) => (
  <SelectListBase
    defaultValue={defaultValue}
    value={value}
    onChange={onChange}
    autoFocus={autoFocus}
    multiple={multiple}
  >
    {({ getContainerProps }) => (
      <Paper
        type="list"
        {...getContainerProps({
          ...props,
          style: {
            ...style,
            maxHeight: maxVisibleItems ? maxVisibleItems * 50 : 'auto',
          },
        })}
      >
        {title && <MenuTitle>{title}</MenuTitle>}
        {children}
      </Paper>
    )}
  </SelectListBase>
)

export default Menu
