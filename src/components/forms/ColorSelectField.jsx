import React from 'react'
import { Field } from 'redux-form/immutable'
import { ColorSelect, ColorMenuItem } from 'components/ColorSelect'
import { CATEGORY_COLORS } from 'const'

const getColorName = color => CATEGORY_COLORS[color]
const COLORS = Object.entries(CATEGORY_COLORS).map(([color, name]) => ({
  color,
  name,
}))

const ColorField = ({ input, ...props }) => (
  <ColorSelect getColorName={getColorName} {...input} {...props}>
    {COLORS.map(({ color, name }) => (
      <ColorMenuItem key={color} color={color} name={name} />
    ))}
  </ColorSelect>
)

const ColorFormField = ({ ...props }) => (
  <Field component={ColorField} {...props} />
)

export default ColorFormField
