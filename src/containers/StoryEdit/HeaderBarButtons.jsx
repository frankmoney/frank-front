import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  Delete as RemoveIcon,
  Check as PublishIcon,
  Close as UnpublishIcon,
} from 'material-ui-icons'
import {
  Button,
  IconButton,
  CustomMenuItem as MenuItem,
} from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import StoryConfirmDialog from 'components/dialogs/StoryConfirmDialog'
import MoreActionsButton from 'components/MoreActionsButton'
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
  menuItem: {
    justifyContent: 'unset',
  },
  menuIcon: {
    width: 22,
    height: 22,
    paddingRight: 11,
  },
}

const SaveButton = compose(
  connect(
    state => ({
      disabled: isSaveButtonDisabledSelector(state),
      loading: isSavingSelector(state),
      children: saveButtonLabelSelector(state),
    }),
    dispatch => ({ onClick: () => dispatch(ACTIONS.createOrUpdate()) })
  )
)(Button)

const PublishButton = compose(
  connect(state => ({
    disabled: isPublishButtonDisabledSelector(state),
    children: publishButtonLabelSelector(state),
  }))
)(Button)

const DeleteButton = compose(
  connect(state => ({
    disabled: isDeleteButtonDisabledSelector(state),
  }))
)(IconButton)

class HeaderBarButtons extends React.PureComponent {
  state = {
    isDrawerOpen: false,
    confirmDialogType: null,
    isConfirmDialogOpen: false,
  }

  handleToggleConfirmDialog = type => {
    this.setState({
      confirmDialogType: type,
      isConfirmDialogOpen: !this.state.isConfirmDialogOpen,
    })
  }

  handleDialogConfirmClick = type => {
    if (type === 'delete') {
      this.props.delete()
    } else {
      this.props.publish(type === 'publish')
    }
  }

  render() {
    const { classes, className, isPublished, saved, processing } = this.props

    const { isConfirmDialogOpen, confirmDialogType } = this.state

    const dialogTitle =
      confirmDialogType === 'delete'
        ? `Delete ${isPublished ? 'story' : 'draft'}`
        : `${
            confirmDialogType !== 'publish'
              ? 'Unpublish story'
              : 'Publish story'
          }`

    const dialogConfirmLabel =
      confirmDialogType === 'delete'
        ? `Delete`
        : `${confirmDialogType !== 'publish' ? 'Unpublish' : 'Publish'}`

    const dialogConfirmButtonType =
      confirmDialogType === 'delete'
        ? `danger`
        : `${confirmDialogType !== 'publish' ? 'negative' : 'positive'}`

    const dialogConfirmButtonProps = {
      type: dialogConfirmButtonType,
      loading: processing,
    }

    return (
      <div className={cx(classes.container, className)}>
        <SaveButton fat type="secondary" />
        <PublishButton
          fat
          type="primary"
          icon={PublishIcon}
          onClick={() => this.handleToggleConfirmDialog('publish')}
        />
        {saved &&
          (isPublished ? (
            <MoreActionsButton>
              <MenuItem
                className={classes.menuItem}
                onClick={() => this.handleToggleConfirmDialog('unpublish')}
              >
                <UnpublishIcon className={classes.menuIcon} /> Unpublish
              </MenuItem>
              <MenuItem
                className={classes.menuItem}
                onClick={() => this.handleToggleConfirmDialog('delete')}
              >
                <RemoveIcon className={classes.menuIcon} /> Delete
              </MenuItem>
            </MoreActionsButton>
          ) : (
            <DeleteButton
              round
              type="secondary"
              icon={RemoveIcon}
              onClick={() => this.handleToggleConfirmDialog('delete')}
            />
          ))}

        <StoryConfirmDialog
          open={isConfirmDialogOpen}
          title={dialogTitle}
          confirmLabel={dialogConfirmLabel}
          confirmButtonProps={dialogConfirmButtonProps}
          onRequestClose={() =>
            this.handleToggleConfirmDialog(confirmDialogType)
          }
          onConfirmClick={() =>
            this.handleDialogConfirmClick(confirmDialogType)
          }
        />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  processing: isProcessingSelector,
  saved: savedSelector,
  isNew: isNewStorySelector,
  isPublished: isPublishedSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    createOrUpdate: ACTIONS.createOrUpdate,
    publish: ACTIONS.publish,
    delete: ACTIONS.delete,
  },
])

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectStyles(styles)
)(HeaderBarButtons)
