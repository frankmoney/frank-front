// @flow
import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { Delete as RemoveIcon, Check as PublishIcon } from 'material-ui-icons'
import reconnect from 'utils/reconnect'
import { ConfirmDialog } from 'components/kit/Dialog'
import Button, { IconButton } from 'components/kit/Button'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import ACTIONS from './actions'
import { SAVE_MODE } from './constants'
import {
  storySelector,
  dirtySelector,
  validSelector,
  savingSelector,
  deletingSelector,
  processingSelector,
  publishOrUnpublishConfirmDialogShownSelector,
  deleteConfirmDialogShownSelector,
} from './selectors'

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
  unpublishButton: {
    width: 130,
  },
}

type Props = {|
  ...InjectStylesProps,
  //
  story: { publishedAt: string },
  dirty: boolean,
  valid: boolean,
  saving: number,
  deleting: boolean,
  processing: boolean,
  publishOrUnpublishConfirmDialogShown: boolean,
  deleteConfirmDialogShown: boolean,
  createOrUpdateStory: (payload: { mode: number, published?: boolean }) => void,
  deleteStory: () => void,
  showPublishOrUnpublishConfirmDialog: (payload: { show: boolean }) => void,
  showDeleteConfirmDialog: (payload: { show: boolean }) => void,
|}

const HeaderBarButtons = ({
  classes,
  className,
  story: { pid, publishedAt },
  dirty,
  valid,
  saving,
  deleting,
  processing,
  publishOrUnpublishConfirmDialogShown,
  deleteConfirmDialogShown,
  createOrUpdateStory,
  deleteStory,
  showPublishOrUnpublishConfirmDialog,
  showDeleteConfirmDialog,
}: Props) => (
  <div className={cx(classes.container, className)}>
    <Button
      className={classes.saveButton}
      color={publishedAt && dirty ? 'blue' : 'gray'}
      disabled={
        (processing || !dirty || (publishedAt && !valid)) &&
        saving !== SAVE_MODE.createOrUpdate
      }
      label={dirty || !pid ? (publishedAt ? 'Update' : 'Save') : 'Saved'}
      loading={saving === SAVE_MODE.createOrUpdate}
      onClick={() =>
        createOrUpdateStory({
          mode: SAVE_MODE.createOrUpdate,
          published: !!publishedAt,
        })
      }
    />

    <Button
      className={!publishedAt && classes.unpublishButton}
      color={publishedAt ? 'gray' : 'green'}
      icon={!publishedAt && <PublishIcon />}
      disabled={processing}
      label={publishedAt ? 'Unpublish' : 'Publish'}
      onClick={() => showPublishOrUnpublishConfirmDialog({ show: true })}
    />

    <ConfirmDialog
      open={publishOrUnpublishConfirmDialogShown}
      title={`${publishedAt ? 'Unpublish' : 'Publish'} this story?`}
      confirmLabel={publishedAt ? 'Unpublish' : 'Publish'}
      confirmButtonProps={{
        color: publishedAt ? 'blue' : 'green',
        disabled: processing && saving !== SAVE_MODE.publishOrUnpublish,
        loading: saving === SAVE_MODE.publishOrUnpublish,
      }}
      cancelButtonProps={{ disabled: saving === SAVE_MODE.publishOrUnpublish }}
      onCancel={() => showPublishOrUnpublishConfirmDialog({ show: false })}
      onConfirm={() =>
        createOrUpdateStory({
          mode: SAVE_MODE.publishOrUnpublish,
          published: !publishedAt,
        })
      }
    />

    <IconButton
      icon={<RemoveIcon />}
      disabled={!pid || processing}
      onClick={() => showDeleteConfirmDialog({ show: true })}
    />

    <ConfirmDialog
      open={deleteConfirmDialogShown}
      title={`Delete ${publishedAt ? 'story' : 'draft'}?`}
      confirmLabel="Delete"
      confirmButtonProps={{
        color: 'red',
        disabled: (!pid || processing) && !deleting,
        loading: deleting,
      }}
      cancelButtonProps={{ disabled: deleting }}
      onCancel={() => showDeleteConfirmDialog({ show: false })}
      onConfirm={() => deleteStory()}
    />
  </div>
)

export default compose(
  reconnect(
    {
      story: storySelector,
      dirty: dirtySelector,
      valid: validSelector,
      saving: savingSelector,
      deleting: deletingSelector,
      processing: processingSelector,
      publishOrUnpublishConfirmDialogShown: publishOrUnpublishConfirmDialogShownSelector,
      deleteConfirmDialogShown: deleteConfirmDialogShownSelector,
    },
    {
      createOrUpdateStory: ACTIONS.createOrUpdate,
      deleteStory: ACTIONS.delete,
      showPublishOrUnpublishConfirmDialog:
        ACTIONS.showPublishOrUnpublishConfirmDialog,
      showDeleteConfirmDialog: ACTIONS.showDeleteConfirmDialog,
    }
  ),
  injectStyles(styles)
)(HeaderBarButtons)
