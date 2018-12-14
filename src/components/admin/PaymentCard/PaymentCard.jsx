// @flow strict-local
// spellchecker:ignore mmaa
import React from 'react'
import cx from 'classnames'
import {
  Check as PublishIcon,
  FormatListBulleted as SimilarIcon,
} from 'material-ui-icons'
import { required, maxLength, createValidateFromRules } from '@frankmoney/forms'
import { compose, withPropsOnChange, withHandlers } from 'recompose'
import { reduxForm } from 'redux-form/immutable'
import { injectStyles } from 'utils/styles'
import { formatFullDate } from 'utils/dates'
import Button from 'components/kit/Button'
import Paper from 'components/kit/Paper'
import CategorySelect from 'components/CategorySelect'
import CurrencyDelta from 'components/CurrencyDelta'
import BankDescription from 'components/common/BankDescription'
import ReduxFormControl from 'components/kit/ReduxFormControl'
import DescriptionField from './DescriptionField'
import EchoFormDataButton from './EchoFormDataButton'
import PeerField from './PeerField'
import styles from './PaymentCard.jss'

const validation = {
  categoryId: [required],
  description: [required, maxLength(200)],
  peerName: [required, maxLength(40)],
}

const counters = {
  peerName: { unit: 'character', max: 40 },
  description: { unit: 'character', max: 200 },
}

const validate = createValidateFromRules(validation)

const PaymentCard = ({
  classes,
  className,
  id: paymentId,
  accountId,
  postedOn,
  amount,
  categories,
  categoryId,
  similarCount,
  saving,
  saved,
  publishing,
  published,
  onSaveClick,
  onPublishClick,
  onUpdateClick,
  pristine,
  invalid,
  form: formName,
}) => (
  <Paper type="card" className={cx(classes.root, className)}>
    <div className={classes.header}>
      <div className={classes.createdAt}>{formatFullDate(postedOn, true)}</div>
      <div className={classes.amount}>
        <CurrencyDelta value={amount} />
      </div>
    </div>
    <BankDescription className={classes.bank} />
    <div className={classes.body}>
      <div className={classes.bodyRow}>
        <div className={classes.recipient}>
          <ReduxFormControl.Field
            name="peerName"
            counter={counters.peerName}
            component={PeerField}
            stretch
            className={classes.field}
            label="Recipient"
            placeholder="Specify recipient..."
            larger
            accountId={accountId}
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
          />
        </div>
      </div>
      <div className={classes.bodyRow}>
        <div className={classes.description}>
          <ReduxFormControl.Field
            name="description"
            counter={counters.description}
            component={DescriptionField}
            stretch
            label="Description"
            placeholder="Start typing for suggestions..."
            multiLine
            disableEnter
            larger
            className={classes.field}
            paymentId={paymentId}
            accountId={accountId}
          />
        </div>
      </div>
    </div>
    <div className={classes.footer}>
      <div className={classes.leftButtons}>
        {similarCount > 0 ? (
          <Button
            className={classes.similarButton}
            icon={<SimilarIcon />}
            label={`${similarCount} similar payment${similarCount > 1 && 's'}`}
          />
        ) : (
          'No similar payments found'
        )}
      </div>
      <div className={classes.rightButtons}>
        {/*
        ---NOT IN MVP---
        <IconButton
          className={classes.rightButton}
          icon={<MoreActionsButton />}
        />
        <Button
          className={classes.rightButton}
          icon={<DiscussIcon />}
          label="Discuss"
        />
        ---NOT IN MVP--
        */}
        {published ? (
          <Button
            width={95}
            className={classes.rightButton}
            label={pristine ? 'Updated' : 'Update'}
            color={'blue'}
            disabled={saved || publishing || pristine}
            loading={saving}
            onClick={onUpdateClick}
          />
        ) : (
          <EchoFormDataButton
            form={formName}
            width={95}
            className={classes.rightButton}
            label={pristine ? 'Saved' : 'Save'}
            color={'gray'}
            disabled={saved || publishing || pristine}
            loading={saving}
            onClick={onSaveClick}
          />
        )}

        {published && (
          <Button
            width={130}
            className={classes.rightButton}
            label="Unpublish"
            color="gray"
            loading={publishing}
            onClick={onPublishClick}
          />
        )}
        {!published && (
          <Button
            width={130}
            className={classes.rightButton}
            icon={<PublishIcon />}
            label="Publish"
            color="green"
            loading={publishing}
            disabled={invalid}
            onClick={onPublishClick}
          />
        )}
      </div>
    </div>
  </Paper>
)

const pickCardState = ({ category, peer, description = '' }) => ({
  categoryId: category && category.id,
  peerName: (peer && peer.name) || '',
  description,
})

export default compose(
  injectStyles(styles),
  withPropsOnChange(['id', 'peer', 'category', 'description'], props => ({
    initialValues: pickCardState(props),
    form: `payment-${props.id}`,
  })),
  reduxForm({
    enableReinitialize: true,
    validate,
    onSubmit: (data, _, props) => {
      const { publishing, ...otherData } = data.toJS()
      const payment = { paymentId: props.id, ...otherData }

      if (!publishing) {
        props.onPaymentSave(payment)
      } else if (props.published) {
        props.onPaymentUnpublish(payment)
      } else {
        props.onPaymentPublish(payment)
      }
    },
  }),
  withHandlers({
    onUpdateClick: props => () => {
      props.change('publishing', false)
      setTimeout(() => props.submit(), 100)
    },
    onSaveClick: props => (event, formData) => {
      props.onPaymentSave({ paymentId: props.id, ...formData })
    },
    onPublishClick: props => () => {
      props.change('publishing', true)
      setImmediate(() => props.submit())
    },
    handleCloseConfirm: props => () => {
      props.changeConfirmOpen(false)
    },
    // анпаблишим карточку
    handleSubmitConfirm: props => data => {
      const payment = { paymentId: props.id, ...data.toJS() }

      props.onPaymentUnpublish(payment)
    },
  })
)(PaymentCard)
