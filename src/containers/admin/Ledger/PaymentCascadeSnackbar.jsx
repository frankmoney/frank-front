import React from 'react'
import Snack from 'components/kit/Snack'
import pluralize from 'utils/pluralize'

const PaymentCascadeSnackBar = ({ count, ...props }) => (
  <Snack
    message={`${pluralize('unpublished payment', count)} updated`}
    dismissByTimeout={5000}
    color="blue"
    {...props}
  />
)

export default PaymentCascadeSnackBar
