// @flow
import * as React from 'react'

type RenderFn<P> = (props: P, ref: React.Ref<React.ElementType>) => React.Node

export type ForwardRefFn<Props> = (
  RenderFn<Props>
) => React.ComponentType<Props>

const forwardRef: ForwardRefFn<Object> =
  // $FlowFixMe: forwardRef is not supported in flow yet
  React.forwardRef

export default forwardRef
