import sample from 'lodash/sample'
import { CATEGORY_PALETTE, INCOME_CATEGORY_PALETTE } from 'const'

export const FORM_NAME = 'edit-category'

export const createEmptyCategory = categoryType => ({
  color: sample(
    sample(
      categoryType === 'spending' ? CATEGORY_PALETTE : INCOME_CATEGORY_PALETTE
    )
  ),
  name: '',
})
