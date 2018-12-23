import React from 'react'
import SidebarSnack from 'components/SidebarSnack'
import pluralize from 'utils/pluralize'

const PaymentCascadeSnackBar = ({ count, ...props }) => (
  <SidebarSnack
    message={`${pluralize('unpublished payment', count)} updated`}
    dismissByTimeout={5000}
    color="blue"
    {...props}
  />
)

export default PaymentCascadeSnackBar
