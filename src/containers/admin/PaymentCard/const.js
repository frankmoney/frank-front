import { maxLength, required } from '@frankmoney/forms'

export const validation = {
  categoryId: [required],
  description: [required, maxLength(120)],
  peerName: [required, maxLength(60)],
}

export const counters = {
  peerName: { unit: 'character', max: 60 },
  description: { unit: 'character', max: 120 },
}

export const getFormName = id => `payment-${id}`

export const pickFormValues = ({
  category,
  peer,
  description = '',
  verified,
}) => ({
  categoryId: category && category.id,
  peerName: (peer && peer.name) || '',
  description,
  verified,
})
