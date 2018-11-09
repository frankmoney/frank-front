// @flow
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
import { CustomMenuItem as MenuItem } from '@frankmoney/components'
import StoryConfirmDialog from 'components/dialogs/StoryConfirmDialog'
import MoreActionsButton from 'components/MoreActionsButton'
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
  saveButton: {
    width: 87,
  },
  publishButton: {
    width: 130,
  },
}

const SaveButton = compose(
  connect(
    state => ({
      disabled: isSaveButtonDisabledSelector(state),
      loading: isSavingSelector(state),
      label: saveButtonLabelSelector(state),
    }),
    dispatch => ({ onClick: () => dispatch(ACTIONS.createOrUpdate()) })
  )
)(Button)

const PublishButton = compose(
  connect(state => ({
    disabled: isPublishButtonDisabledSelector(state),
    label: publishButtonLabelSelector(state),
  }))
)(Button)

const DeleteButton = compose(
  connect(state => ({
    disabled: isDeleteButtonDisabledSelector(state),
  }))
)(IconButton)

type ConfirmDialogType = 'delete' | 'publish' | 'unpublish'

type Props = {|
  ...InjectStylesProps,
  //
  delete: Function,
  isPublished?: boolean | string, // TODO: fix those selectors
  processing?: boolean,
  publish: Function,
  saved?: string, // why?
  unpublish: Function,
|}

type State = {|
  confirmDialogType: ?ConfirmDialogType,
  isConfirmDialogOpen: boolean,
  isDrawerOpen: boolean,
|}

class HeaderBarButtons extends React.PureComponent<Props, State> {
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
        <SaveButton className={classes.saveButton} />
        <PublishButton
          className={classes.publishButton}
          color="green"
          icon={<PublishIcon />}
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
              icon={<RemoveIcon />}
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
    delete: ACTIONS.delete,
    publish: ACTIONS.publish,
    unpublish: ACTIONS.unpublish,
  },
])

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectStyles(styles)
)(HeaderBarButtons)
