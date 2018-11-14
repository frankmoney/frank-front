// @flow strict-local
// eslint-disable-next-line import/prefer-default-export
export { injectStyles } from '@frankmoney/ui'

type Classes = { [class: string]: string }

export type InjectStylesProps = {|
  classes: Classes,
  className?: string,
|}
