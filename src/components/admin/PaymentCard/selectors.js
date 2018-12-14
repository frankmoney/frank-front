import { isDirty } from 'redux-form/immutable'

export const descriptionChanged = formName => {
  const isDirtySelector = isDirty(formName)

  return state => isDirtySelector(state, ['description'])
}

export const categoryChanged = formName => {
  const isDirtySelector = isDirty(formName)

  return state => isDirtySelector(state, ['categoryId'])
}

export const peerChanged = formName => {
  const isDirtySelector = isDirty(formName)

  return state => isDirtySelector(state, ['peerName'])
}
