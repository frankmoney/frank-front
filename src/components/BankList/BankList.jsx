import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import SelectListBase from 'components/kit/SelectListBase'
import BankListItem from './BankListItem'

const styles = {
  root: {
    width: 740,
  },
}

const BankList = ({
  className,
  classes,
  theme,
  defaultSelectedId,
  selectedId,
  onBankSelect,
  banks,
  selectListProps = {},
  ...otherProps
}) => (
  <SelectListBase
    defaultValue={defaultSelectedId}
    value={selectedId}
    onChange={onBankSelect}
    {...selectListProps}
  >
    {({ getContainerProps, getItemProps }) => (
      <div
        {...getContainerProps({
          className: cx(classes.root, className),
          ...otherProps,
        })}
      >
        {banks.map(
          ({ code: id, name, mediumLogoUrl: logoUrl, url: website }) => (
            <BankListItem
              key={id}
              id={id}
              name={name}
              logoUrl={logoUrl}
              website={website}
              {...getItemProps({
                value: id,
              })}
            />
          )
        )}
      </div>
    )}
  </SelectListBase>
)

export default injectStyles(styles)(BankList)
