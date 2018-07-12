import React from 'react'
import { Button, IconButton, Switch } from '@frankmoney/components'
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
  ...otherProps
}) => (
  <div className={cx(className, classes.root)} {...otherProps}>
    <div className={classes.header}>
      <div className={classes.createdAt}>
        {format(createdAt, 'MMMM d, h:mmaa')}
      </div>
      <div className={classes.info}>
        <CurrencyDelta value={delta} />
        <IconButton className={classes.infoButton} icon={InfoIcon} />
        {/*<InfoIcon className={classes.infoIcon} />*/}
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
        <Button className={classes.discussButton} type="primary">
          <ModeCommentIcon className={classes.buttonIcon} />
          Discuss
        </Button>
        <Button className={classes.doneButton} type="primary">
          <CheckIcon className={classes.buttonIcon} />
          Done
        </Button>
      </div>
    </div>
  </div>
)

export default injectStyles(styles)(InboxCard)
