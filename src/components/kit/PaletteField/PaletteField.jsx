import React from 'react'
import Field from 'components/kit/fields/Field'
import Palette from 'components/kit/Palette'

const PaletteField = ({
  palette,
  sampleWidth,
  sampleHeight,
  paletteProps,
  noUnderline,
  ...otherProps
}) => (
  <Field noUnderline {...otherProps}>
    <Palette
      palette={palette}
      sampleWidth={sampleWidth}
      sampleHeight={sampleHeight}
      {...paletteProps}
    />
  </Field>
)

export default PaletteField
