// spellchecker:ignore mmaa
import React from 'react'
import {
  Button,
  CheckedMenuItem,
  IconButton,
  Paper,
  Switch,
} from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import format from 'date-fns/format'
import CheckCircleIcon from 'material-ui-icons/CheckCircle'
import CheckIcon from 'material-ui-icons/Check'
import InfoIcon from 'material-ui-icons/InfoOutline'
import ModeCommentIcon from 'material-ui-icons/ModeComment'
import MoreHoriz from 'material-ui-icons/MoreHoriz'
import CategorySelect from 'components/CategorySelect'
import CurrencyDelta from 'components/CurrencyDelta'
import { Field } from 'components/Field'
import SelectField from 'components/SelectField'
import TextBox from 'components/TextBox'
import colors from 'styles/colors'
import styles from './PaymentCard.jss'

const PaymentCard = ({
  classes,
  className,
  createdAt,
  categories,
  peers,
  amount,
  peerId,
  peerName,
  categoryAddedFromSimilar,
  categoryId,
  descriptionAddedFromSimilar,
  description,
  useForSimilar,
  onPeerIdChange,
  onPeerNameChange,
  onCategoryIdChange,
  onDescriptionChange,
  searchText,
  ...otherProps
}) => (
  <Paper className={cx(classes.root, className)} {...otherProps}>
    <div className={classes.header}>
      <div className={classes.createdAt}>
        {format(createdAt, 'MMMM d, h:mmaa')}
      </div>
      <div className={classes.info}>
        <CurrencyDelta value={amount} />
        <IconButton className={classes.infoButton} icon={InfoIcon} />
      </div>
    </div>
    <div className={classes.body}>
      <div className={classes.recipient}>
        <Field
          className={classes.field}
          title="Recipient"
          hint={
            peerId
              ? 'Had been reviewed previously'
              : "First-timer, please check if the name's correct"
          }
        >
          {peerId ? (
            <div className={classes.peerName}>
              <SelectField
                value={peerId}
                fullWidth
                onChange={event => onPeerIdChange(event.target.value)}
              >
                {peers.map(({ id, name }) => (
                  <CheckedMenuItem className={classes.peerItem} value={id}>
                    <CheckCircleIcon className={classes.peerItemIcon} />
                    <div className={classes.peerItemName}>{name}</div>
                  </CheckedMenuItem>
                ))}
              </SelectField>
            </div>
          ) : (
            <TextBox
              className={classes.peerTextBox}
              value={peerName}
              onChange={event => onPeerNameChange(event.target.value)}
            />
          )}
        </Field>
      </div>
      <div className={classes.category}>
        <Field
          className={classes.field}
          title="Category"
          hint={categoryAddedFromSimilar && 'Added from similar payment'}
        >
          <CategorySelect
            className={classes.categorySelect}
            categories={categories}
            value={categoryId}
            fullWidth
            onChange={event => onCategoryIdChange(event.target.value)}
          />
        </Field>
      </div>
      <div className={classes.description}>
        <Field
          className={classes.field}
          title="Description"
          hint={descriptionAddedFromSimilar && 'Added from similar payment'}
        >
          <TextBox
            className={classes.descriptionTextBox}
            expand="vertically"
            value={description}
            onChange={event => onDescriptionChange(event.target.value)}
          />
        </Field>
      </div>
    </div>
    <div className={classes.footer}>
      <div className={classes.useForSimilar}>
        <div>
          <Switch color={colors.green} checked={useForSimilar} />
        </div>
        <div className={classes.useForSimilarHint}>
          Add same recipient, category and description for similar payments
          automatically
        </div>
      </div>
      <div className={classes.buttons}>
        <IconButton className={classes.moreButton} round icon={MoreHoriz} />
        <Button
          className={classes.discussButton}
          fat
          type="secondary"
          icon={ModeCommentIcon}
        >
          Discuss
        </Button>
        <Button
          className={classes.doneButton}
          fat
          icon={CheckIcon}
          type="primary"
        >
          Done
        </Button>
      </div>
    </div>
  </Paper>
)

export default injectStyles(styles)(PaymentCard)
