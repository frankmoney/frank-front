// spellchecker:ignore mmaa
import React from 'react'
import { Button, IconButton, Paper, Switch } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import { compose, withState } from 'recompose'
import cx from 'classnames'
import format from 'date-fns/format'
import CheckCircleIcon from 'material-ui-icons/CheckCircle'
import CheckIcon from 'material-ui-icons/Check'
import InfoIcon from 'material-ui-icons/InfoOutline'
import ModeCommentIcon from 'material-ui-icons/ModeComment'
import MoreHoriz from 'material-ui-icons/MoreHoriz'
import CategorySelect from 'components/CategorySelect'
import CurrencyDelta from 'components/CurrencyDelta'
import Field from 'components/Field'
import TextBox from 'components/TextBox'
import styles from './InboxCard.jss'

const InboxCard = ({
  classes,
  className,
  createdAt,
  delta,
  recipientReviewed,
  recipientName,
  categoryAddedFromSimilar,
  categoryId,
  descriptionAddedFromSimilar,
  description,
  useForSimilar,
  setRecipientName,
  setDescription,
  ...otherProps
}) => (
  <Paper className={cx(classes.root, className)} {...otherProps}>
    <div className={classes.header}>
      <div className={classes.createdAt}>
        {format(createdAt, 'MMMM d, h:mmaa')}
      </div>
      <div className={classes.info}>
        <CurrencyDelta value={delta} />
        <IconButton className={classes.infoButton} icon={InfoIcon} />
      </div>
    </div>
    <div className={classes.body}>
      <div className={classes.recipient}>
        <Field
          className={classes.field}
          title="Recipient"
          hint={
            recipientReviewed
              ? 'Had been reviewed previously'
              : "First-timer, please check if the name's correct"
          }
        >
          {recipientReviewed ? (
            <div className={classes.recipientName}>
              <CheckCircleIcon className={classes.recipientReviewedIcon} />
              {recipientName}
            </div>
          ) : (
            <TextBox
              className={classes.recipientTextBox}
              value={recipientName || ''}
              onChange={event => setRecipientName(event.target.value)}
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
            size={16}
            value={categoryId}
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
            onChange={event => setDescription(event.target.value)}
          />
        </Field>
      </div>
    </div>
    <div className={classes.footer}>
      <div className={classes.useForSimilar}>
        <div>
          <Switch color="#21CB61" checked={useForSimilar} />
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
          type="primary"
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

export default compose(
  withState(
    'recipientName',
    'setRecipientName',
    ({ recipientName }) => recipientName || ''
  ),
  withState('description', 'setDescription', ({ description }) => description),
  injectStyles(styles)
)(InboxCard)
