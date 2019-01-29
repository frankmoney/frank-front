// @flow strict-local
import React from 'react'
import cx from 'classnames'
import CopyIcon from 'material-ui-icons/FilterNone'
import PasteIcon from 'material-ui-icons/AddToPhotos'
import PublicIcon from 'material-ui-icons/Public'
import PublishIcon from 'material-ui-icons/Check'
import SimilarIcon from 'material-ui-icons/FormatListBulleted'
import { createValidateFromRules } from '@frankmoney/forms'
import {
  compose,
  withPropsOnChange,
  withHandlers,
  branch,
  renderComponent,
} from 'recompose'
import { reduxForm } from 'redux-form/immutable'
import { createRouteUrl } from '@frankmoney/utils'
import { injectStyles } from 'utils/styles'
import { formatFullDate } from 'utils/dates'
import { MenuItem } from 'components/kit/Menu'
import Checkbox from 'components/kit/Checkbox'
import Button from 'components/kit/Button'
import Paper from 'components/kit/Paper'
import CategorySelect from 'components/CategorySelect'
import CurrencyDelta from 'components/CurrencyDelta'
import BankDescription from 'components/common/BankDescription'
import ReduxFormControl from 'components/kit/ReduxFormControl'
import EllipsisButtonMenu from 'components/EllipsisButtonMenu'
import { ROUTES } from 'const'
import Copied from 'components/Copied'
import PaymentStatus from 'components/admin/PaymentStatus'
import SimilarPaymentsDrawer from 'containers/admin/Ledger/SimilarPaymentsDrawer'
import PeerSuggestField from 'components/PeerSuggestField'
import DescriptionSuggestField from 'components/DescriptionSuggestField'
import styles from './PaymentCard.jss'
import connectCard from './connectCard'
import { getFormName, counters, validation, pickFormValues } from './const'
import PendingPaymentCard from './PendingPaymentCard'

const validate = createValidateFromRules(validation)

const PaymentCard = ({
  accountId,
  amount,
  amountClassName,
  categories,
  categoryId,
  categoryLoading,
  classes,
  className,
  descriptionLoading,
  form: formName,
  handleFieldBlur,
  handleFieldChange,
  hasCheckbox,
  id: paymentId,
  isChecked,
  onCheck,
  onPublishClick,
  onSaveClick,
  onSimilarDrawerOpen,
  onUnpublishClick,
  onUpdateClick,
  peerLoading,
  pending,
  postedOn,
  pristine,
  publishing,
  saved,
  saving,
  showSimilarPayments,
  similarCount,
  source,
  verified,
  // copy-paste props
  canPaste,
  onPaymentPaste,
  onPaymentCopyClick,
}) => (
  <Paper type="card" className={cx(classes.root, className)}>
    <div className={classes.header}>
      <div className={classes.createdAt}>
        {hasCheckbox && (
          <Checkbox
            className={classes.checkbox}
            checked={isChecked}
            onChange={onCheck}
          />
        )}
        {formatFullDate(postedOn, true)}
      </div>
      <div className={cx(classes.amount, amountClassName)}>
        <CurrencyDelta value={amount} />
        <PaymentStatus
          className={classes.status}
          verified={verified}
          pending={pending}
        />
      </div>
    </div>
    <BankDescription
      className={classes.bank}
      logoClassName={classes.bankLogo}
      textClassName={classes.bankDescription}
      {...source}
    />
    <div className={classes.body}>
      <div className={classes.bodyRow}>
        <div className={classes.recipient}>
          <ReduxFormControl.Field
            name="peerName"
            counter={counters.peerName}
            component={PeerSuggestField}
            stretch
            className={classes.field}
            label={amount >= 0 ? 'Received from' : 'Transferred to'}
            placeholder="Specify recipient..."
            larger
            fontBolder
            accountId={accountId}
            loading={peerLoading}
            onBlur={handleFieldBlur}
            onChange={handleFieldChange}
          />
        </div>
        <div className={classes.category}>
          <ReduxFormControl.Field
            name="categoryId"
            component={CategorySelect}
            typeSeparated
            className={classes.categorySelect}
            categories={categories}
            value={categoryId}
            label="Category"
            placeholder="Choose a category"
            larger
            loading={categoryLoading}
            onBlur={handleFieldBlur}
            onChange={handleFieldChange}
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
            paymentId={paymentId}
            accountId={accountId}
            loading={descriptionLoading}
            onBlur={handleFieldBlur}
            onChange={handleFieldChange}
          />
        </div>
      </div>
    </div>
    <div className={classes.footer}>
      <div className={classes.leftButtons}>
        {showSimilarPayments ? (
          similarCount > 0 ? (
            <>
              <Button
                className={classes.similarButton}
                icon={<SimilarIcon />}
                label={`${similarCount} similar payment${
                  similarCount > 1 ? 's' : ''
                }`}
                onClick={() => onSimilarDrawerOpen()}
              />
              <SimilarPaymentsDrawer
                paymentId={paymentId}
                similarCount={similarCount}
              />
            </>
          ) : (
            'No similar payments found'
          )
        ) : null}
      </div>
      <div className={classes.rightButtons}>
        <Copied message="Public link has been copied to clipboard">
          {({ onCopy }) => (
            <EllipsisButtonMenu
              arrowCenter
              alignByArrow
              up
              className={classes.rightButton}
            >
              <MenuItem
                icon={<PublicIcon />}
                label="Copy public link"
                onSelect={() =>
                  onCopy(
                    window.location.origin +
                      createRouteUrl(ROUTES.account.payment.idRoot, {
                        accountId,
                        paymentId,
                      })
                  )
                }
              />
              <MenuItem
                icon={<CopyIcon />}
                label="Copy payment info"
                onSelect={onPaymentCopyClick}
              />
              {canPaste && (
                <MenuItem
                  icon={<PasteIcon />}
                  label="Paste payment info"
                  onSelect={() => onPaymentPaste(paymentId)}
                />
              )}
            </EllipsisButtonMenu>
          )}
        </Copied>
        {verified ? (
          <Button
            width={95}
            className={classes.rightButton}
            label={pristine ? 'Updated' : 'Update'}
            color={'blue'}
            disabled={saved || publishing || pristine}
            loading={!publishing && saving}
            onClick={onUpdateClick}
          />
        ) : (
          <Button
            form={formName}
            width={95}
            className={classes.rightButton}
            label={pristine ? 'Saved' : 'Save'}
            color={'gray'}
            disabled={saved || publishing || pristine}
            loading={!publishing && saving}
            onClick={onSaveClick}
          />
        )}
        {verified && (
          <Button
            width={130}
            className={classes.rightButton}
            label="Unpublish"
            color="gray"
            loading={publishing}
            onClick={onUnpublishClick}
          />
        )}
        {!verified && (
          <Button
            width={130}
            className={classes.rightButton}
            icon={<PublishIcon />}
            label="Publish"
            color="green"
            loading={publishing}
            onClick={onPublishClick}
          />
        )}
      </div>
    </div>
  </Paper>
)

export default compose(
  injectStyles(styles),
  branch(props => props.pending, renderComponent(PendingPaymentCard)),
  connectCard,
  withPropsOnChange(['id', 'peer', 'category', 'description'], props => ({
    initialValues: pickFormValues(props),
    form: getFormName(props.id),
  })),
  reduxForm({
    enableReinitialize: true,
    validate,
    onSubmit: (data, _, props) => {
      const { publishing } = data.toJS()
      const payment = { id: props.id }
      if (!publishing) {
        props.onPaymentSave(payment)
      } else if (!props.verified) {
        props.onPaymentPublish(payment)
      }
    },
  }),
  withPropsOnChange(
    ['saving', 'publishing'],
    ({
      saving,
      publishing,
      description,
      peer,
      category,
      descriptionChanged,
      peerChanged,
      categoryChanged,
      descriptionUpdater,
      peerUpdater,
      categoryUpdater,
    }) =>
      saving || publishing
        ? {
            // При сохранении карточки заполенные поля могут изменить значения других
            // Поменяться могут другие нетронуте поля, если они были пустые либо изменялись системным юзером
            // для этого показываем в этом поле лоадинг
            descriptionLoading:
              !descriptionChanged &&
              (!description ||
                (descriptionUpdater && descriptionUpdater.isSystem)),
            peerLoading:
              !peerChanged && (!peer || (peerUpdater && peerUpdater.isSystem)),
            categoryLoading:
              !categoryChanged &&
              (!category || (categoryUpdater && categoryUpdater.isSystem)),
          }
        : {}
  ),
  withHandlers({
    onUpdateClick: props => () => {
      props.change('publishing', false)
      setTimeout(() => props.submit(), 100)
    },
    onSaveClick: props => () => {
      props.onPaymentSave({ id: props.id })
    },
    onPublishClick: props => () => {
      props.change('publishing', true)
      setImmediate(() => props.submit())
    },
    onUnpublishClick: props => () => {
      props.onPaymentUnpublish({ id: props.id })
    },
    onPaymentCopyClick: props => () => {
      props.onPaymentCopy(props.form)
    },
  })
)(PaymentCard)
