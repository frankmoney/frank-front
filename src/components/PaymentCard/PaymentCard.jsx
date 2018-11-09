// @flow
// spellchecker:ignore mmaa
import React from 'react'
import cx from 'classnames'
import format from 'date-fns/format'
import CheckCircleIcon from 'material-ui-icons/CheckCircle'
import CheckIcon from 'material-ui-icons/Check'
import InfoIcon from 'material-ui-icons/InfoOutline'
import ModeCommentIcon from 'material-ui-icons/ModeComment'
import MoreHoriz from 'material-ui-icons/MoreHoriz'
import { CheckedMenuItem } from '@frankmoney/components'
import CategorySelect from 'components/CategorySelect'
import CurrencyDelta from 'components/CurrencyDelta'
import { Field } from 'components/Field'
import SelectField from 'components/SelectField'
import TextBox from 'components/TextBox'
import Button, { IconButton } from 'components/kit/Button'
import Paper from 'components/kit/Paper'
import Switch from 'components/kit/Switch'
import ToggleButton from 'components/kit/ToggleButton'
import { injectStyles } from 'utils/styles'
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
  <Paper type="card" className={cx(classes.root, className)} {...otherProps}>
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
          <Switch checked={useForSimilar} />
        </div>
        <div className={classes.useForSimilarHint}>
          Add same recipient, category and description for similar payments
          automatically
        </div>
      </div>
      <div className={classes.buttons}>
        <IconButton icon={<MoreHoriz />} />
        <ToggleButton icon={<ModeCommentIcon />} label="Discuss" />
        <Button icon={<CheckIcon />} color="green" label="Done" />
      </div>
    </div>
  </Paper>
)

export default injectStyles(styles)(PaymentCard)
