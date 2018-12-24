// @flow strict

export interface ReduxState {
  getIn: (Array<string>) => Object; // flowlint-line unclear-type:off
}

export interface ReduxStore {
  getState: () => ReduxState;
}

export type Selector<T> = ReduxState => T
