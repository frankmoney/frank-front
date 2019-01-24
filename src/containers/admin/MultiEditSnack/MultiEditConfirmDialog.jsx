import React from 'react'
import { ConfirmDialog } from 'components/kit/Dialog'
import pluralize from 'utils/pluralize'
import reconnect from 'utils/reconnect'
import * as SELECTORS from './selectors'
import ACTIONS from './actions'

const MultiEditConfirmDialog = ({
  paymentsCount,
  canPublish,
  canUnpublish,
  open,
  loading,
  ...props
}) =>
  (canPublish || canUnpublish) && (
    <ConfirmDialog
      title={`${canPublish ? 'Publish' : 'Unpublish'} ${pluralize(
        'payment',
        paymentsCount
      )}`}
      confirmLabel={canPublish ? 'Publish' : 'Unpublish'}
      open={open}
      confirmButtonProps={{ loading, color: 'blue' }}
      disableCloseOnConfirm
      {...props}
    />
  )

export default reconnect(
  {
    paymentsCount: SELECTORS.paymentsCount,
    canPublish: SELECTORS.canPublish,
    canUnpublish: SELECTORS.canUnpublish,
    open: SELECTORS.publishDialogOpen,
    loading: SELECTORS.isUpdating,
  },
  {
    onCancel: () => ACTIONS.cancelChangePublish(),
    onConfirm: () => ACTIONS.confirmChangePublish(),
  }
)(MultiEditConfirmDialog)
