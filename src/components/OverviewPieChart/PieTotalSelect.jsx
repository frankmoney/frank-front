// @flow strict-local
import React from 'react'
import cx from 'classnames'
import ArrowDropDown from 'material-ui-icons/ArrowDropDown'
import Select from 'components/kit/Select'
import { MenuItem } from 'components/kit/Menu'
import type { PieTotal } from 'data/models/pieData'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

export type TotalSelectCb = string => void

type Props = {|
  ...InjectStylesProps,
  //
  label: string,
  selectable?: boolean,
  onChange: TotalSelectCb,
  value: PieTotal,
|}

const styles = {
  root: {
    alignItems: 'center',
    color: '#252B43',
    cursor: 'pointer',
    display: 'flex',
    fontSize: 16,
    height: 20,
    outline: 'none',
    paddingTop: 2,
    position: 'absolute',
    whiteSpace: 'nowrap',
  },
  notSelectable: {
    cursor: 'default',
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

const PieTotalSelect = ({
  classes,
  className,
  label,
  selectable,
  value: propValue,
  ...otherProps
}: Props) =>
  selectable ? (
    <Select
      dropdownWidth={210}
      {...otherProps}
      alignByArrow
      arrowAt="center"
      align="center"
      direction="up"
      value={propValue}
      renderControl={({
        open,
        place,
        value,
        getInputProps,
        getAnchorProps,
      }) => (
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
  ) : (
    <div className={cx(classes.root, classes.notSelectable, className)}>
      <span>{label}</span>
      <span className={classes.value}>{propValue}</span>
    </div>
  )

PieTotalSelect.defaultProps = {
  label: '% of total',
}

export default injectStyles(styles)(PieTotalSelect)
