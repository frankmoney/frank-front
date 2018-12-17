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
import Button from 'components/kit/Button/index'
import Paper from 'components/kit/Paper/index'
import CategorySelect from 'components/CategorySelect/index'
import CurrencyDelta from 'components/CurrencyDelta/index'
import BankDescription from 'components/common/BankDescription/index'
import ReduxFormControl from 'components/kit/ReduxFormControl/index'
import DescriptionField from './DescriptionField'
import PeerField from './PeerField'
import styles from './PaymentCard.jss'
import connectCard from './connectCard'
import { getFormName } from './const'

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
  onUnpublishClick,
  onUpdateClick,
  pristine,
  form: formName,
  descriptionLoading,
  peerLoading,
  categoryLoading,
  handleFieldBlur,
  handleFieldChange,
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
            loading={descriptionLoading}
            onBlur={handleFieldBlur}
            onChange={handleFieldChange}
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
        {published && (
          <Button
            width={130}
            className={classes.rightButton}
            label="Unpublish"
            color="gray"
            loading={publishing}
            onClick={onUnpublishClick}
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
            onClick={onPublishClick}
          />
        )}
      </div>
    </div>
  </Paper>
)

const pickFormValues = ({ category, peer, description = '' }) => ({
  categoryId: category && category.id,
  peerName: (peer && peer.name) || '',
  description,
})

export default compose(
  injectStyles(styles),
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
      } else if (!props.published) {
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
  })
)(PaymentCard)
