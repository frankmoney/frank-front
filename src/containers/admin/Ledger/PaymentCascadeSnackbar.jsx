import React from 'react'
import { SnackBar, SnackBarIconButton } from '@frankmoney/components'
import { Close as IconDismiss } from 'material-ui-icons'
import pluralize from 'utils/pluralize'

const PaymentCascadeSnackBar = ({ count, ...props }) => (
  <SnackBar
    message={`${pluralize('unpublished payment', count)} updated`}
    dismissOnTimeout={5000}
    theme="primary"
    buttons={[
      <SnackBarIconButton
        iconComponent={IconDismiss}
        onClick={props.onDismiss}
      />,
    ]}
    {...props}
  />
)

export default PaymentCascadeSnackBar
