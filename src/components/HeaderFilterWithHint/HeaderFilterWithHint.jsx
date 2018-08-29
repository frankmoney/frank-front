import React from 'react'
import { HeaderFilter } from '@frankmoney/components'
import HintMenuItem from './HintMenuItem'

const HeaderFilterWithHint = ({
  value,
  selectedValue,
  hint,
  children,
  ...otherProps
}) => (
  <HeaderFilter selectedValue={selectedValue} {...otherProps}>
    <HintMenuItem>{hint}</HintMenuItem>
    {children}
  </HeaderFilter>
)

export default HeaderFilterWithHint
