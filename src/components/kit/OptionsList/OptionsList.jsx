import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import SelectListBase from 'components/kit/SelectListBase'
import OptionsListItem from './OptionsListItem'

const styles = {
  root: {
    width: 370,
  },
  item: {
    marginBottom: 10,
  },
}

const OptionsList = ({
  classes,
  className,
  defaultValue,
  value,
  onChange,
  autoFocus,
  children,
  ...otherProps
}) => (
  <SelectListBase
    defaultValue={defaultValue}
    value={value}
    onChange={onChange}
    autoFocus={autoFocus}
  >
    {({ getContainerProps, getItemProps }) => (
      <div
        {...getContainerProps({
          className: cx(classes.root, className),
          ...otherProps,
        })}
      >
        {React.Children.map(children, element =>
          React.cloneElement(
            element,
            getItemProps({
              className: cx(element.props.className, classes.item),
              value: element.props.value,
            })
          )
        )}
      </div>
    )}
  </SelectListBase>
)

OptionsList.Item = OptionsListItem

export default injectStyles(styles)(OptionsList)
