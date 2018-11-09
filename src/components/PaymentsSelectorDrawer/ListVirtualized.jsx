// @flow
import React from 'react'
import cx from 'classnames'
import { AutoSizer, List } from 'react-virtualized'
import { injectStyles } from 'utils/styles'

const styles = {
  list: {
    border: 'none',
    outline: 'none',
    userSelect: 'none',
  },
}

const ListVirtualized = ({
  className,
  classes,
  itemCount: rowCount,
  itemComponent: rowRenderer,
  itemHeight: rowHeight,
}) => (
  <AutoSizer>
    {({ height, width }) => (
      <List
        className={cx(classes.list, className)}
        width={width}
        height={height}
        rowCount={rowCount}
        rowHeight={rowHeight}
        rowRenderer={rowRenderer}
      />
    )}
  </AutoSizer>
)

export default injectStyles(styles)(ListVirtualized)
