import React from 'react'
import { Switch } from '@frankmoney/components'
import colors from 'styles/colors'
import Field from './Field'

const CanInviteField = ({ checked }) => (
  <Field title="Can invite teammates">
    <Switch color={colors.green} checked={checked} />
  </Field>
)

export default CanInviteField
