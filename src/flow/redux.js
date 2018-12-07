// @flow strict

export type Store = Object // flowlint-line unclear-type:off

export type Selector<T> = Store => T
