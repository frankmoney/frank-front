import { withProps, compose } from 'recompose'
import InboxCard from 'components/InboxCard'

export default compose(
  withProps(
    ({
      data: { id, sum, frnk_description: description, categories, peerclient },
    }) => ({
      id,
      createdAt: '2018-01-01 05:00',
      delta: parseFloat(sum),
      recipientName: peerclient.firstName,
      categoryAddedFromSimilar: true,
      categoryId: categories && categories[0] && categories[0].id,
      description,
    })
  )
)(InboxCard)
