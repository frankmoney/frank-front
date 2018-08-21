import React from 'react'
import cx from 'classnames'
import { Delete as RemoveIcon, Check as PublishIcon } from 'material-ui-icons'
import { Button } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import StoryDeleteConfirmDialog from 'components/dialogs/StoryDeleteConfirmDialog'

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    flex: [1, 1],
    padding: [0, 15],
  },
  removeButton: {
    padding: '0 26px !important',
    marginRight: 10,
  },
})

class HeaderBarButtons extends React.PureComponent {
  state = {
    isDrawerOpen: false,
    isConfirmDialogOpen: false,
  }

  handleToggleConfirmDialog = () => {
    this.setState({ isConfirmDialogOpen: !this.state.isConfirmDialogOpen })
  }

  render() {
    const { classes, className, id } = this.props

    const { isConfirmDialogOpen } = this.state

    return (
      <div className={cx(classes.container, className)}>
        <Button
          className={classes.removeButton}
          fat
          type="secondary"
          icon={RemoveIcon}
          onClick={this.handleToggleConfirmDialog}
        />
        <Button
          className={classes.discussButton}
          fat
          type="primary"
          icon={PublishIcon}
        >
          Publish
        </Button>
        <StoryDeleteConfirmDialog
          open={isConfirmDialogOpen}
          onRequestClose={this.handleToggleConfirmDialog}
        />
      </div>
    )
  }
}

export default injectStyles(styles)(HeaderBarButtons)
