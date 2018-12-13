import React from 'react'
import TextField from 'components/kit/TextField'

const SampleCategoryAdornment = ({ size = 16, color = '#ccc' }) => (
  <div
    style={{
      borderRadius: '50%',
      background: color,
      width: size,
      height: size,
      marginTop: 5,
    }}
  />
)

const CategoryTextField = ({ color, textBoxProps = {}, ...props }) => (
  <TextField
    adornment={<SampleCategoryAdornment color={color} />}
    adornmentWidth={24}
    textBoxProps={{
      ...textBoxProps,
      style: { ...textBoxProps.style, color, fontWeight: 500 },
    }}
    {...props}
  />
)

export default CategoryTextField
