import { Edit as EditIcon, Public as PublicIcon } from 'material-ui-icons'
import React from 'react'
import Snack from 'components/kit/Snack'
import pluralize from 'utils/pluralize'
import reconnect from 'utils/reconnect'
import ACTIONS from './actions'
import * as SELECTORS from './selectors'
import UnpublishIcon from './Unpublish.svg'
import preventZeroPaymentsProps from './preventZeroPaymentsProps'

class MultiEditSelectionSnack extends React.Component {
  handleDismissEnd = reason => {
    if (reason === 'close-click') {
      this.props.clearSelection()
    }
  }

  render() {
    const {
      paymentsCount,
      canPublish,
      canUnpublish,
      onChangePublish,
      onEdit,
      leave,
      ...props
    } = this.props

    const buttons = [
      <Snack.Button
        key="edit"
        tooltip="Edit"
        icon={<EditIcon />}
        onClick={() => onEdit()}
      />,
    ]

    if (canPublish || canUnpublish) {
      buttons.push(
        <Snack.Button
          key="public"
          tooltip={canPublish ? 'Publish' : 'Unpublish'}
          icon={canPublish ? <PublicIcon /> : <UnpublishIcon />}
          onClick={() => onChangePublish()}
        />
      )
    }

    return (
      <Snack
        shown={paymentsCount > 0}
        color="blue"
        message={`${pluralize('payment', paymentsCount)} selected`}
        buttons={buttons}
        onDismissAnimationEnd={this.handleDismissEnd}
        {...props}
      />
    )
  }
}

export default reconnect(
  {
    paymentsCount: SELECTORS.paymentsCount,
    canPublish: SELECTORS.canPublish,
    canUnpublish: SELECTORS.canUnpublish,
    shown: SELECTORS.selectionSnackShown,
  },
  {
    clearSelection: ACTIONS.clear,
    onChangePublish: ACTIONS.changePublish,
    onEdit: ACTIONS.beginEdit,
  }
)(
  preventZeroPaymentsProps(['canPublish', 'canUnpublish'])(
    MultiEditSelectionSnack
  )
)
