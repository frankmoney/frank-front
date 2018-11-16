// @flow
// spellchecker:ignore mmaa
import React from 'react'
import cx from 'classnames'
import format from 'date-fns/format'
import CheckIcon from 'material-ui-icons/Check'
import InfoIcon from 'material-ui-icons/InfoOutline'
import ModeCommentIcon from 'material-ui-icons/ModeComment'
import MoreHoriz from 'material-ui-icons/MoreHoriz'
import CategoryMenuItem from 'components/CategoryMenuItem'
import CurrencyDelta from 'components/CurrencyDelta'
import { MenuItem } from 'components/kit/Menu'
import TextField from 'components/kit/TextField'
import SelectField from 'components/kit/SelectField'
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
      {/* <div className={classes.info}> */}
      {/* <CurrencyDelta value={amount} /> */}
      {/* <IconButton className={classes.infoButton} icon={InfoIcon} /> */}
      {/* </div> */}
    </div>
    <div className={classes.body}>
      <div className={classes.recipient}>
        {peerId ? (
          <SelectField
            className={classes.recipient}
            label="Recipient"
            additionalLabel={
              peerId
                ? 'Had been reviewed previously'
                : "First-timer, please check if the name's correct"
            }
            value={peerId}
            onChange={onPeerIdChange}
          >
            {peers.map(({ id, name }) => <MenuItem value={id} label={name} />)}
          </SelectField>
        ) : (
          <TextField
            className={classes.recipient}
            label="Recipient"
            additionalLabel={
              peerId
                ? 'Had been reviewed previously'
                : "First-timer, please check if the name's correct"
            }
            value={peerName}
            onChange={onPeerNameChange}
          />
        )}
      </div>
      <div className={classes.category}>
        <SelectField
          className={classes.categorySelect}
          label="Category"
          additionalLabel={
            categoryAddedFromSimilar && 'Added from similar payment'
          }
          value={categoryId}
          onChange={onCategoryIdChange}
        >
          {categories.map(({ id, name, color }) => (
            <CategoryMenuItem color={color} value={id} label={name} />
          ))}
        </SelectField>
      </div>
      <div className={classes.description}>
        <TextField
          className={classes.descriptionTextBox}
          label="Description"
          additionalLabel={
            descriptionAddedFromSimilar && 'Added from similar payment'
          }
          multiLine
          value={description}
          onChange={onDescriptionChange}
        />
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
