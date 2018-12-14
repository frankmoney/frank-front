import { formValueSelector } from 'redux-form/immutable'
import { FORM_NAME, CUSTOM_COLOR_ID } from './constants'

const formSelector = formValueSelector(FORM_NAME)

export const customColorModeSelector = state =>
  formSelector(state, 'color') === CUSTOM_COLOR_ID

export const customColorSelector = state => formSelector(state, 'customColor')
