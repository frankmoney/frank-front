import sample from 'lodash/sample'
import { CATEGORY_COLORS } from 'const'

export const FORM_NAME = 'edit-category'

export const CUSTOM_COLOR_ID = 'custom'

export const COLORS = Object.entries(CATEGORY_COLORS).map(([color, name]) => ({
  id: color,
  color,
  name,
}))

export const COLORS_AND_CUSTOM = [
  ...COLORS,
  { id: CUSTOM_COLOR_ID, color: 'rgba(0,0,0,0.3)', name: 'Custom color...' },
]

export const isCustomColor = color =>
  !Object.keys(CATEGORY_COLORS).includes(color)

export const createEmptyCategory = () => ({
  color: sample(Object.keys(CATEGORY_COLORS)),
  name: '',
})
