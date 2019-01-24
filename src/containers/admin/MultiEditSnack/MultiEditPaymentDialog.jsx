// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { reduxForm } from 'redux-form/immutable'
import { createValidateFromRules } from '@frankmoney/forms'
import { injectStyles } from 'utils/styles'
import Button from 'components/kit/Button'
import reconnect from 'utils/reconnect'
import Dialog from 'components/kit/Dialog'
import pluralize from 'utils/pluralize'
import TextField from 'components/kit/TextField'
import PeerField from 'containers/admin/PaymentCard/PeerField'
import CategorySelect from 'components/CategorySelect'
import ReduxFormControl from 'components/kit/ReduxFormControl'
import { currentAccountIdSelector } from 'redux/selectors/user'
import { counters, validationWithoutRequired } from '../PaymentCard/const'
import * as SELECTORS from './selectors'
import ACTIONS from './actions'
import { FORM_NAME } from './const'

const validate = createValidateFromRules(validationWithoutRequired)

const styles = theme => ({
  root: {
    width: 850,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 60,
  },
  changesInfo: {
    ...theme.fontMedium(16, 22),
    color: 'rgba(37, 43, 67, 0.3)',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      marginLeft: 10,
    },
  },

  body: {},
  bodyRow: {
    display: 'flex',
    '&:first-child': {
      marginBottom: 25,
    },
  },
  field: {
    display: 'block',
    width: '100%',
  },
  recipient: {
    position: 'relative',
    width: '60%',
    marginRight: 40,
  },
  category: {
    fontWeight: 500,
    maxWidth: '40%',
    flexGrow: 0,
    flexShrink: 1,
  },
  description: {
    position: 'relative',
    flex: 'auto',
  },
})

const PEER_LABEL_BY_CATEGORY_TYPE = {
  spending: 'Transferred to',
  income: 'Received from',
  mixed: 'Transferred to or received from',
}

const MultiEditPaymentDialog = ({
  classes,
  className,
  paymentsCount,
  cumulativeCategoryType,
  updateForecastMessage,
  categories = [],
  onCancel,
  onConfirm,
  accountId,
  submit,
  updating,
  ...dialogProps
}: Props) => (
  <Dialog
    className={cx(classes.root, className)}
    onClose={onCancel}
    disableFallInsideFocus
    {...dialogProps}
  >
    <Dialog.Title>{`Edit ${pluralize('payment', paymentsCount)}`}</Dialog.Title>
    <div className={classes.body}>
      <div className={classes.bodyRow}>
        <div className={classes.recipient}>
          <ReduxFormControl.Field
            name="peerName"
            counter={counters.peerName}
            component={PeerField}
            stretch
            className={classes.field}
            label={PEER_LABEL_BY_CATEGORY_TYPE[cumulativeCategoryType]}
            placeholder="Specify recipient..."
            larger
            fontBolder
            accountId={accountId}
            disabled={updating}
          />
        </div>
        <div className={classes.category}>
          <ReduxFormControl.Field
            name="categoryId"
            component={CategorySelect}
            typeSeparated
            className={classes.categorySelect}
            categories={categories}
            label="Category"
            placeholder="Choose a category"
            disabled={updating}
            larger
            stretch
          />
        </div>
      </div>
      <div className={classes.bodyRow}>
        <div className={classes.description}>
          <ReduxFormControl.Field
            name="description"
            counter={counters.description}
            component={TextField}
            stretch
            label="Description"
            placeholder="Start typing for suggestions..."
            multiLine
            disableEnter
            larger
            className={classes.field}
            accountId={accountId}
            disabled={updating}
          />
        </div>
      </div>
    </div>
    <div className={classes.footer}>
      <div className={classes.changesInfo}>{updateForecastMessage}</div>
      <div className={classes.buttons}>
        <Button
          color="gray"
          width={130}
          label="Cancel"
          onClick={onCancel}
          disabled={updating}
        />
        <Button
          color="blue"
          width={235}
          label="Update"
          onClick={submit}
          loading={updating}
        />
      </div>
    </div>
  </Dialog>
)

export default compose(
  injectStyles(styles),
  reconnect(
    {
      initialValues: SELECTORS.initialFormValues,
      cumulativeCategoryType: SELECTORS.categoryType,
      open: SELECTORS.editDialogOpen,
      paymentsCount: SELECTORS.paymentsCount,
      updating: SELECTORS.isUpdating,
      updateForecastMessage: SELECTORS.updateForecastMessage,
      accountId: currentAccountIdSelector,
    },
    {
      onCancel: () => ACTIONS.cancelEdit(),
      onConfirm: data => ACTIONS.confirmEdit(data),
    }
  ),
  reduxForm({
    form: FORM_NAME,
    enableReinitialize: true,
    validate,
    onSubmit: (data, _, props) => {
      props.onConfirm(data.toJS())
    },
  })
)(MultiEditPaymentDialog)
