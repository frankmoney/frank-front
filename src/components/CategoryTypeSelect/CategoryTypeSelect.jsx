// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { ArrowDropDown } from 'material-ui-icons'
import Select from 'components/kit/Select'
import { MenuItem } from 'components/kit/Menu'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

export type CategoryTypeSelectCb = string => void

type Props = {|
  ...InjectStylesProps,
  //
  label: string,
  onChange: CategoryTypeSelectCb,
  value: string,
  values: Array<string>,
|}

const styles = {
  root: {
    fontSize: 16,
    height: 20,
    color: '#252B43',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    outline: 'none',
  },
  value: {
    fontWeight: 500,
    marginLeft: 5,
  },
  arrow: {
    color: 'rgba(37,43,67,0.3)',
    flexShrink: 0,
    marginLeft: 1,
  },
  arrowOpen: {
    color: '#252B43',
  },
  arrowUp: {
    transform: 'rotate(180deg)',
  },
}

const CategoryTypeSelect = ({
  classes,
  className,
  label,
  ...otherProps
}: Props) => (
  <Select
    dropdownWidth={210}
    {...otherProps}
    alignByArrow
    arrowAt="center"
    align="center"
    direction="up"
    renderControl={({ open, place, value, getInputProps, getAnchorProps }) => (
      <div className={cx(classes.root, className)} {...getInputProps()}>
        <span>{label}</span>
        <span className={classes.value}>{value}</span>
        <ArrowDropDown
          className={cx(classes.arrow, {
            [classes.arrowOpen]: open,
            [classes.arrowUp]: open && place === 'up',
          })}
          {...getAnchorProps()}
        />
      </div>
    )}
  >
    <MenuItem label="income" value="income" />
    <MenuItem label="spending" value="spending" />
  </Select>
)

CategoryTypeSelect.defaultProps = {
  label: '% of total',
  values: ['income', 'spending'],
  defaultValue: 'income',
}

export default injectStyles(styles)(CategoryTypeSelect)
