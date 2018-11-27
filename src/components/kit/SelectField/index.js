// @flow strict-local
import type { ReactComponent } from 'flow/react'
import SelectField from './SelectField'
import SelectFieldLeft from './SelectFieldLeft'

type SelectFieldComponents = ReactComponent<typeof SelectField> & {|
  Left: ReactComponent<typeof SelectFieldLeft>,
|}

// flowlint-next-line unclear-type:off
const DotNotation: any = SelectField

DotNotation.Left = SelectFieldLeft

export default (DotNotation: SelectFieldComponents)
