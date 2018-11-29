// @flow
import React, { forwardRef } from 'react'
import { AutoSizer, List } from 'react-virtualized'

const styles = {
  border: 'none',
  outline: 'none',
  userSelect: 'none',
}

const ListVirtualized = forwardRef(
  (
    {
      className,
      itemCount: rowCount,
      itemComponent: rowRenderer,
      itemHeight: rowHeight,
    },
    ref
  ) => (
    <AutoSizer>
      {({ height, width }) => (
        <List
          ref={ref}
          className={className}
          style={styles}
          width={width}
          height={height}
          rowCount={rowCount}
          rowHeight={rowHeight}
          rowRenderer={rowRenderer}
        />
      )}
    </AutoSizer>
  )
)

export default ListVirtualized
