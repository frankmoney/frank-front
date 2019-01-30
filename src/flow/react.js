// @flow strict
import * as React from 'react'

export type ReactComponent<T> = React.ComponentType<React.ElementConfig<T>>

export type Ref = {
  current: ?Object, // flowlint-line unclear-type:warn
}
