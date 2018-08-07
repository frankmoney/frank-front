export const mapPayment = ({
  id,
  sum,
  frnk_description,
  frnk_title,
  categories,
  peerclient,
  description,
  title,
  ...otherProps
}) => ({
  id: id.toString(), // TODO stupid Table component hack
  createdAt: '2018-01-01 05:00',
  delta: parseFloat(sum),
  recipientName: peerclient.firstName,
  categoryAddedFromSimilar: true,
  category: categories &&
    categories[0] && {
      ...categories[0],
    },
  description: frnk_description,
  title: frnk_title,
  ...otherProps,
})
