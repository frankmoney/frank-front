// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { injectStyles } from 'utils/styles'
import reconnect from 'utils/reconnect'
import Dialog from 'components/kit/Dialog'
import pluralize from 'utils/pluralize'
import * as SELECTORS from './selectors'
import MultiEditForm from './MultiEditForm'
import ACTIONS from './actions'

const styles = {
  root: {
    width: 850,
  },
}

const MultiEditPaymentDialog = ({
  classes,
  className,
  paymentsCount,
  categories = [],
  onCancel,
  onSave,
  onSaveAndPublish,
  accountId,
  submit,
  updating,
  ...dialogProps
}: Props) => (
  <Dialog
    className={cx(classes.root, className)}
    onClose={onCancel}
    disableFallInsideFocus
    disableKeepMounted
    {...dialogProps}
  >
    <Dialog.Title>{`Edit ${pluralize('payment', paymentsCount)}`}</Dialog.Title>
    <MultiEditForm
      categories={categories}
      onSave={onSave}
      onSaveAndPublish={onSaveAndPublish}
      onCancel={onCancel}
    />
  </Dialog>
)

export default compose(
  injectStyles(styles),
  reconnect(
    {
      open: SELECTORS.editDialogOpen,
      paymentsCount: SELECTORS.paymentsCount,
    },
    {
      onCancel: () => ACTIONS.cancelEdit(),
      onSave: () => ACTIONS.save(),
      onSaveAndPublish: () => ACTIONS.saveAndPublish(),
    }
  )
)(MultiEditPaymentDialog)
