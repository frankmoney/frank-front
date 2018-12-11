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
      width,
      height,
      ...otherProps
    },
    ref
  ) => (
    <AutoSizer>
      {({ height: autoHeight, width: autoWidth }) => (
        <List
          ref={ref}
          className={className}
          style={styles}
          width={autoWidth}
          height={autoHeight}
          rowCount={rowCount}
          rowHeight={rowHeight}
          rowRenderer={rowRenderer}
          {...otherProps}
        />
      )}
    </AutoSizer>
  )
)

export default ListVirtualized
