// @flow
// spellchecker:ignore mmaa
import React from 'react'
import cx from 'classnames'
import {
  Check as PublishIcon,
  ModeComment as DiscussIcon,
  MoreHoriz as MoreActionsButton,
  FormatListBulleted as SimilarIcon,
} from 'material-ui-icons'
import { injectStyles } from 'utils/styles'
import { formatFullDate } from 'utils/dates'
import Button, { IconButton } from 'components/kit/Button'
import Paper from 'components/kit/Paper'
import CategorySelect from 'components/CategorySelect'
import CurrencyDelta from 'components/CurrencyDelta'
import SuggestField from 'components/SuggestField'
import BankDescription from 'components/common/BankDescription'
import styles from './PaymentCard.jss'

const PaymentCard = ({
  classes,
  className,
  searchText,
  id: paymentId,
  postedOn,
  amount,
  bankIcon,
  bankDescription,
  peer: { id: peerId, name: peerName } = {},
  peerUpdatedBy,
  categories,
  category: { id: categoryId } = {},
  categoryUpdatedBy,
  description,
  descriptionUpdateBy,
  similarCount,
  searchingSuggestions,
  suggestedPeers,
  suggestedDescriptions,
  onPeerSuggestionSearch,
  onDescriptionSuggestionSearch,
  onPaymentUpdate,
  ...otherProps
}) => (
  <Paper type="card" className={cx(classes.root, className)} {...otherProps}>
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
          <SuggestField
            className={classes.field}
            label="Recipient"
            placeholder="Specify recipient..."
            larger
            value={peerName}
            getSuggestions={onPeerSuggestionSearch}
            suggestions={suggestedPeers}
            searching={searchingSuggestions === 'peers'}
            suggestKeyName="name"
            onChange={peer => onPaymentUpdate({ paymentId, peer })}
          />
        </div>
        <div className={classes.category}>
          <CategorySelect
            className={classes.categorySelect}
            categories={categories}
            value={categoryId}
            label="Category"
            larger
            underline={false}
            menuProps={{
              style: {
                width: 'unset',
              },
              maxVisibleItems: 5,
            }}
            onChange={categoryId => onPaymentUpdate({ paymentId, categoryId })}
          />
        </div>
      </div>
      <div className={classes.bodyRow}>
        <div className={classes.description}>
          <SuggestField
            className={classes.field}
            label="Description"
            placeholder="Start typing for suggestions..."
            multiLine
            larger
            value={description}
            getSuggestions={onDescriptionSuggestionSearch}
            suggestions={suggestedDescriptions}
            searching={searchingSuggestions === 'descriptions'}
            suggestKeyName="text"
            onChange={description =>
              onPaymentUpdate({ paymentId, description })
            }
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
          className={classes.rightButton}
          icon={<PublishIcon />}
          label="Publish"
          color="green"
        />
      </div>
    </div>
  </Paper>
)

export default injectStyles(styles)(PaymentCard)
