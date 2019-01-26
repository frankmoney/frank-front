// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { reduxForm } from 'redux-form/immutable'
import { createValidateFromRules } from '@frankmoney/forms'
import { injectStyles } from 'utils/styles'
import Button from 'components/kit/Button'
import reconnect from 'utils/reconnect'
import PeerSuggestField from 'components/PeerSuggestField'
import CategorySelect from 'components/CategorySelect'
import ReduxFormControl from 'components/kit/ReduxFormControl'
import { currentAccountIdSelector } from 'redux/selectors/user'
import DescriptionSuggestField from 'components/DescriptionSuggestField'
import { counters, validationWithoutRequired } from '../PaymentCard/const'
import * as SELECTORS from './selectors'
import { FORM_NAME } from './const'

const validate = createValidateFromRules(validationWithoutRequired)

const styles = theme => ({
  root: {},
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
  cumulativeCategoryType,
  updateForecastMessage,
  categories,
  onCancel,
  accountId,
  submit,
  updating,
  disableConfirm,
}: Props) => (
  <div className={cx(classes.root, className)}>
    <div className={classes.body}>
      <div className={classes.bodyRow}>
        <div className={classes.recipient}>
          <ReduxFormControl.Field
            name="peerName"
            counter={counters.peerName}
            component={PeerSuggestField}
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
            component={DescriptionSuggestField}
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
          disabled={disableConfirm}
        />
      </div>
    </div>
  </div>
)

export default compose(
  injectStyles(styles),
  reconnect({
    initialValues: SELECTORS.initialFormValues,
    cumulativeCategoryType: SELECTORS.categoryType,
    updating: SELECTORS.isUpdating,
    updateForecastMessage: SELECTORS.updateForecastMessage,
    accountId: currentAccountIdSelector,
    disableConfirm: SELECTORS.noPaymentChanges,
  }),
  reduxForm({
    form: FORM_NAME,
    enableReinitialize: true,
    validate,
    onSubmit: (data, _, props) => {
      props.onConfirm(data.toJS())
    },
  })
)(MultiEditPaymentDialog)
