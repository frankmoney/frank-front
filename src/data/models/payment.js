// eslint-disable-next-line import/prefer-default-export
export const mapPayment = ({ ...payment }) => ({
  createdAt: '2018-01-01 05:00',
  categoryAddedFromSimilar: true,
  ...payment,
})
