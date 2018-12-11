// @flow
import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import { compose } from 'recompose'
import { Delete as RemoveIcon, Check as PublishIcon } from 'material-ui-icons'
import reconnect from 'utils/reconnect'
import { ConfirmDialog } from 'components/kit/Dialog'
import Button, { IconButton } from 'components/kit/Button'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import {
  isSavingSelector,
  savedSelector,
  isProcessingSelector,
  isPublishedSelector,
  isNewStorySelector,
  isDeleteButtonDisabledSelector,
  isSaveButtonDisabledSelector,
  isPublishButtonDisabledSelector,
  saveButtonLabelSelector,
  publishButtonLabelSelector,
  updateButtonLabelSelector,
} from './selectors'
import ACTIONS from './actions'

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    flex: [1, 1],
    padding: [0, 15],
    '& > :not(:first-child)': {
      marginLeft: 10,
    },
  },
  removeButton: {
    padding: '0 26px !important',
  },
  saveButton: {
    width: 96,
  },
  unpublishedButton: {
    width: 130,
  },
}

const SaveButton = compose(
  reconnect(
    {
      disabled: isSaveButtonDisabledSelector,
      loading: isSavingSelector,
      label: saveButtonLabelSelector,
    },
    { onClick: ACTIONS.createOrUpdate }
  )
)(Button)

const UpdateButton = compose(
  reconnect(
    {
      disabled: isSaveButtonDisabledSelector,
      loading: isSavingSelector,
    },
    { onClick: ACTIONS.updatePublished }
  )
)(Button)

const PublishButton = compose(
  reconnect({
    disabled: isPublishButtonDisabledSelector,
    label: publishButtonLabelSelector,
  })
)(Button)

const DeleteButton = compose(
  reconnect({
    disabled: isDeleteButtonDisabledSelector,
  })
)(IconButton)

type ConfirmDialogType = 'delete' | 'publish' | 'unpublish'

type Props = {|
  ...InjectStylesProps,
  //
  delete: Function,
  isPublished?: boolean | string, // TODO: fix those selectors
  processing?: boolean,
  publish: Function,
  saved?: boolean | string,
  unpublish: Function,
|}

type State = {|
  confirmDialogType: ?ConfirmDialogType,
  isConfirmDialogOpen: boolean,
  isDrawerOpen: boolean,
|}

class HeaderBarButtons extends React.PureComponent<Props, State> {
  state = {
    confirmDialogType: null,
    isConfirmDialogOpen: false,
    isDrawerOpen: false,
  }

  getConfigDialogToggleHandler = R.memoizeWith(R.identity, type => () => {
    this.setState({
      confirmDialogType: type,
      isConfirmDialogOpen: !this.state.isConfirmDialogOpen,
    })
  })

  handleDialogConfirmClick = type => {
    // eslint-disable-next-line default-case
    switch (type) {
      case 'delete':
        this.props.delete()
        break
      case 'publish':
        this.props.publish()
        break
      case 'unpublish':
        this.props.unpublish()
        break
    }
  }

  render() {
    const { classes, className, isPublished, saved, processing } = this.props

    const { isConfirmDialogOpen, confirmDialogType } = this.state

    const dialogTitle =
      confirmDialogType === 'delete'
        ? `Delete ${isPublished ? 'story?' : 'draft?'}`
        : `${
            confirmDialogType !== 'publish'
              ? 'Unpublish story?'
              : 'Publish story?'
          }`

    const dialogConfirmLabel =
      confirmDialogType === 'delete'
        ? `Delete`
        : `${confirmDialogType !== 'publish' ? 'Unpublish' : 'Publish'}`

    const dialogConfirmButtonColor =
      confirmDialogType === 'delete'
        ? `red`
        : `${confirmDialogType !== 'publish' ? 'blue' : 'green'}`

    const dialogConfirmButtonProps = {
      color: dialogConfirmButtonColor,
      loading: processing,
    }

    return (
      <div className={cx(classes.container, className)}>
        {isPublished ? (
          <UpdateButton
            color="blue"
            label="Update"
            className={classes.saveButton}
          />
        ) : (
          <SaveButton className={classes.saveButton} />
        )}
        <PublishButton
          className={!isPublished && classes.unpublishedButton}
          color={isPublished ? 'gray' : 'green'}
          icon={!isPublished && <PublishIcon />}
          onClick={this.getConfigDialogToggleHandler(
            isPublished ? 'unpublish' : 'publish'
          )}
        />
        {saved && (
          <DeleteButton
            icon={<RemoveIcon />}
            onClick={this.getConfigDialogToggleHandler('delete')}
          />
        )}

        <ConfirmDialog
          open={isConfirmDialogOpen}
          title={dialogTitle}
          confirmLabel={dialogConfirmLabel}
          confirmButtonProps={dialogConfirmButtonProps}
          onClose={this.getConfigDialogToggleHandler(confirmDialogType)}
          onConfirm={() => this.handleDialogConfirmClick(confirmDialogType)}
        />
      </div>
    )
  }
}

export default compose(
  reconnect(
    {
      processing: isProcessingSelector,
      saved: savedSelector,
      isNew: isNewStorySelector,
      isPublished: isPublishedSelector,
    },
    {
      createOrUpdate: ACTIONS.createOrUpdate,
      delete: ACTIONS.delete,
      publish: ACTIONS.publish,
      unpublish: ACTIONS.unpublish,
    }
  ),
  injectStyles(styles)
)(HeaderBarButtons)
