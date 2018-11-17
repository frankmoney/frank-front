// @flow
import React from 'react'
import cx from 'classnames'
import { compose, withState } from 'recompose'
import { ArrowDropDown } from 'material-ui-icons'
import Select from 'components/kit/Select'
import { MenuItem } from 'components/kit/Menu'
import { injectStyles } from 'utils/styles'

export type CategoryTypeSelectCb = string => void

type Props = {|
  className?: string,
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
    composes: '$arrow',
    color: '#252B43',
    transform: 'rotate(180deg)',
  },
}

const CategoryTypeSelect = ({
  className,
  label,
  classes,
  ...otherProps
}: Props) => (
  <Select
    dropdownWidth={210}
    {...otherProps}
    alignByArrow
    arrowAt="center"
    align="center"
    direction="up"
    renderControl={({ value, getInputProps, getAnchorProps }) => (
      <div className={cx(classes.root, className)} {...getInputProps()}>
        <span>{label}</span>
        <span className={classes.value}>{value}</span>
        <ArrowDropDown
          className={open ? classes.arrowOpen : classes.arrow}
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
}

export default injectStyles(styles)(CategoryTypeSelect)
