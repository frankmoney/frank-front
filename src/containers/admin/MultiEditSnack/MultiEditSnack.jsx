import React from 'react'
import reconnect from 'utils/reconnect'
import MultiEditResultSnack from './MultiEditResultSnack'
import MultiEditSelectionSnack from './MultiEditSelectionSnack'
import MultiEditConfirmDialog from './MultiEditConfirmDialog'
import MultiEditPaymentDialog from './MultiEditPaymentDialog'
import ACTIONS from './actions'

class MultiEditSnack extends React.Component {
  componentWillUnmount() {
    this.props.leave()
  }

  render() {
    const { categories } = this.props

    return (
      <>
        <MultiEditPaymentDialog categories={categories} />
        <MultiEditConfirmDialog />
        <MultiEditResultSnack />
        <MultiEditSelectionSnack />
      </>
    )
  }
}

export default reconnect(null, { leave: ACTIONS.leave })(MultiEditSnack)
