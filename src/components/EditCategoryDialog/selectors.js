import { formValueSelector } from 'redux-form/immutable'
import { FORM_NAME } from './constants'

const formSelector = formValueSelector(FORM_NAME)

export const colorSelector = state => formSelector(state, 'color')
