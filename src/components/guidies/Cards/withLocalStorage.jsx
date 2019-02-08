import localStorage from 'local-storage-fallback'
import { compose, withStateHandlers, branch, renderNothing } from 'recompose'

export default topicName =>
  compose(
    withStateHandlers(
      {
        closed: localStorage.getItem(`how-it-works/topics/${topicName}`),
      },
      {
        onClose: () => () => {
          localStorage.setItem(`how-it-works/topics/${topicName}`, 'true')
          return { closed: true }
        },
      }
    ),
    branch(props => !!props.closed, renderNothing)
  )
