import * as R from 'ramda'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import StoryPublishedDialog from 'components/dialogs/StoryPublishedDialog'
import { isShareDialogOpenSelector, shareDialogUrlSelector } from './selectors'
import * as ACTIONS from './actions'

const mapStateToProps = createStructuredSelector({
  open: isShareDialogOpenSelector,
  url: shareDialogUrlSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    onClose: ACTIONS.toggleShareDialog,
  },
])

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(StoryPublishedDialog)
