// @flow
import createActions from 'utils/createActions'

export default createActions('filters', {
  open: false,
  load: true,
  change: false,
  estimateResults: true,
  apply: false,
  reset: false,
  close: false,
})
