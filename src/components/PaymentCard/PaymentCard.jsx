// spellchecker:ignore mmaa
import React from 'react'
import {
  Button,
  CheckedMenuItem,
  IconButton,
  Paper,
} from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import format from 'date-fns/format'
import {
  Check as PublishIcon,
  ModeComment as DiscussIcon,
  MoreHoriz as MoreActionsButton,
  FormatListBulleted as SimilarIcon,
} from 'material-ui-icons'
import CategorySelect from 'components/CategorySelect'
import CurrencyDelta from 'components/CurrencyDelta'
import { Field } from 'components/Field'
import SuggestField from 'components/SuggestField'
import styles from './PaymentCard.jss'

const PaymentCard = ({
  classes,
  className,
  postedOn,
  amount,
  bankIcon,
  bankDescription,
  peer: { id: peerId, name: peerName },
  peerUpdatedBy,
  categories,
  category: { id: categoryId },
  categoryUpdatedBy,
  description,
  descriptionUpdateBy,
  similarCount,
  searchingSuggestions,
  suggestedPeers,
  suggestedDescriptions,
  onPeerSuggestionSearch,
  onDescriptionSuggestionSearch,
  onPeerChange,
  onCategoryChange,
  onDescriptionChange,
  searchText,
  ...otherProps
}) => (
  <Paper className={cx(classes.root, className)} {...otherProps}>
    <div className={classes.header}>
      <div className={classes.createdAt}>
        {format(postedOn, 'MMMM d, YYYY')}
      </div>
      <div className={classes.amount}>
        <CurrencyDelta value={amount} />
      </div>
    </div>
    <div className={classes.bank}>
      <div className={classes.bankIcon} />
      <div className={classes.bankDescription}>
        <span className={classes.bankDescriptionAccent}>
          Banking description:{' '}
        </span>
        <span className={classes.bankDescriptionText}>
          ONLINE INTERNATIONAL WIRE TRANSFER A/C: BANK HAPOALIM B M TEL-AVIV
          ISRAEL REF: BUSINESS EXPENSES TRN: 4597800186ES 07/05 WIRE_OUTGOING
        </span>
      </div>
    </div>
    <div className={classes.body}>
      <div className={classes.bodyRow}>
        <div className={classes.recipient}>
          <SuggestField
            className={classes.field}
            title="Recipient"
            placeholder="Specify recipient..."
            value={peerName}
            getSuggestions={onPeerSuggestionSearch}
            suggestions={suggestedPeers}
            searching={searchingSuggestions === 'peers'}
            suggestKeyName="name"
          />
        </div>
        <div className={classes.category}>
          <Field className={classes.field} title="Category" hint={''}>
            <CategorySelect
              className={classes.categorySelect}
              categories={categories}
              value={categoryId}
              fullWidth
              // onChange={event => onCategoryIdChange(event.target.value)}
            />
          </Field>
        </div>
      </div>
      <div className={classes.bodyRow}>
        <div className={classes.description}>
          <SuggestField
            className={classes.field}
            title="Description"
            placeholder="Start typing for suggestions..."
            expand="vertically"
            value={description}
            getSuggestions={onDescriptionSuggestionSearch}
            suggestions={suggestedDescriptions}
            searching={searchingSuggestions === 'descriptions'}
            suggestKeyName="text"
          />
        </div>
      </div>
    </div>
    <div className={classes.footer}>
      <div className={classes.leftButtons}>
        {similarCount > 0 ? (
          <Button
            className={classes.similarButton}
            fat
            type="secondary"
            icon={SimilarIcon}
          >
            {similarCount} similar payment{similarCount > 1 && 's'}
          </Button>
        ) : (
          'No similar payments found'
        )}
      </div>
      <div className={classes.rightButtons}>
        <IconButton
          className={classes.rightButton}
          round
          icon={MoreActionsButton}
        />
        <Button
          className={classes.rightButton}
          fat
          type="secondary"
          icon={DiscussIcon}
        >
          Discuss
        </Button>
        <Button
          className={classes.rightButton}
          fat
          icon={PublishIcon}
          type="primary"
        >
          Publish
        </Button>
      </div>
    </div>
  </Paper>
)

export default injectStyles(styles)(PaymentCard)
