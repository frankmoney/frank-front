// @flow
import * as React from 'react'
import Paper from 'components/kit/Paper'
import SelectListBase, {
  type SelectListBaseProps,
} from 'components/kit/SelectListBase'
import forwardRef from 'utils/forwardRef'
import MenuTitle, { MENU_TITLE_HEIGHT } from './MenuTitle'
import { MENU_ITEM_HEIGHT } from './MenuItem'
import type { MenuItemProps } from './MenuItem'

const MenuPaper = forwardRef((props, ref) => (
  <Paper type="list" ref={ref} {...props} />
))

type Props = {|
  ...SelectListBaseProps,
  //
  title?: React.Node,
  maxVisibleItems?: number,
  menuItemProps?: MenuItemProps,
|}

const calcMaxHeight = ({ maxVisibleItems, title }) =>
  typeof maxVisibleItems === 'number'
    ? maxVisibleItems * MENU_ITEM_HEIGHT + Number(!!title) * MENU_TITLE_HEIGHT
    : 'auto'

const Menu = forwardRef(
  (
    {
      component: Root = MenuPaper,
      title,
      maxVisibleItems,
      menuItemProps,
      value,
      onChange,
      defaultValue,
      autoFocus,
      children,
      multiple,
      activeOnFocus,
      scrollContainer,
      onSelectElement,
      onActiveElementChange,
      listRef,
      ...props
    }: Props,
    ref
  ) => (
    <SelectListBase
      ref={listRef}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      autoFocus={autoFocus}
      activeOnFocus={activeOnFocus}
      multiple={multiple}
      scrollContainer={scrollContainer}
      onSelectElement={onSelectElement}
      onActiveElementChange={onActiveElementChange}
    >
      {({ getContainerProps }) => (
        <Root
          {...getContainerProps({
            ...props,
            ref,
            style: {
              ...props.style,
              maxHeight: calcMaxHeight({ maxVisibleItems, title }),
            },
          })}
        >
          {title && <MenuTitle>{title}</MenuTitle>}
          {/* TODO лучше использовать контекст с настройками меню чтобы забирать из айтема, т.к. внутри children может быть что угодно */}
          {menuItemProps
            ? React.Children.map(children, child =>
                React.cloneElement(child, menuItemProps)
              )
            : children}
        </Root>
      )}
    </SelectListBase>
  )
)

export default Menu
