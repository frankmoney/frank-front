import { lifecycle } from 'recompose'

export default lifecycle({
  componentDidMount() {
    window.scrollTo(0, 0)
  },
})
