import React from 'react'
import Snack from 'components/kit/Snack'
import pluralize from 'utils/pluralize'
import reconnect from 'utils/reconnect'
import ACTIONS from './actions'
import * as SELECTORS from './selectors'
import preventZeroPaymentsProps from './preventZeroPaymentsProps'

const MultiEditResultSnack = ({ failed, succeed, paymentsCount, ...props }) => {
  if (!failed && !succeed) {
    return null
  }

  const message = failed
    ? `Can’t update ${pluralize('payment', paymentsCount)}`
    : `${pluralize('payment', paymentsCount)} have been updated`

  return (
    <Snack
      color={failed ? 'red' : 'dark'}
      message={message}
      dismissByTimeout={5000}
      {...props}
    />
  )
}

export default reconnect(
  {
    paymentsCount: SELECTORS.paymentsCount,
    shown: SELECTORS.resultSnackShown,
    failed: SELECTORS.isError,
    succeed: SELECTORS.isSuccess,
  },
  {
    onDismissAnimationEnd: ACTIONS.leave,
  }
)(preventZeroPaymentsProps(['failed', 'succeed'])(MultiEditResultSnack))
