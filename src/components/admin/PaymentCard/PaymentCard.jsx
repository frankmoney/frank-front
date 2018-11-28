// @flow strict-local
// spellchecker:ignore mmaa
import React from 'react'
import cx from 'classnames'
import {
  Check as PublishIcon,
  FormatListBulleted as SimilarIcon,
} from 'material-ui-icons'
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
import PeerField from './PeerField'
import styles from './PaymentCard.jss'

const PaymentCard = ({
  classes,
  className,
  id: paymentId,
  accountId,
  postedOn,
  amount,
  peerName,
  peerId,
  categories,
  categoryId,
  description,
  similarCount,
  saving,
  saved,
  publishing,
  published,
  onSaveClick,
  onPublishClick,
  onPaymentUnublish,
  pristine,
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
            className={classes.categorySelect}
            categories={categories}
            value={categoryId}
            label="Category"
            placeholder="Choose category"
            larger
          />
        </div>
      </div>
      <div className={classes.bodyRow}>
        <div className={classes.description}>
          <ReduxFormControl.Field
            name="description"
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
        <Button
          width={95}
          className={classes.rightButton}
          label={pristine ? 'Saved' : 'Save'}
          color="gray"
          disabled={saved || publishing || pristine}
          loading={saving}
          onClick={onSaveClick}
        />
        <Button
          width={130}
          className={classes.rightButton}
          icon={!published ? <PublishIcon /> : null}
          label={published ? 'Unpublish' : 'Publish'}
          color={published ? 'gray' : 'green'}
          loading={publishing}
          onClick={onPublishClick}
        />
      </div>
    </div>
  </Paper>
)

const pickCardState = ({
  published,
  categoryId,
  peerName = '',
  description = '',
}) => ({
  categoryId,
  peerName,
  description,
})

export default compose(
  injectStyles(styles),
  withPropsOnChange(['id', 'peerName', 'categoryId', 'description'], props => ({
    initialValues: pickCardState(props),
    form: `payment-${props.id}`,
  })),
  reduxForm({
    enableReinitialize: true,
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
    onSaveClick: props => () => {
      props.change('publishing', false)
      setImmediate(() => props.submit())
    },
    onPublishClick: props => () => {
      props.change('publishing', true)
      setImmediate(() => props.submit())
    },
  })
)(PaymentCard)
