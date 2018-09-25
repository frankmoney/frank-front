import React from 'react'
import { MoreHoriz as MoreOptionsIcon } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'
import { IconButton } from '@frankmoney/components'
import { MenuList } from 'material-ui'
import ArrowPopup from 'components/ArrowPopup'

const styles = theme => ({
  list: {
    backgroundColor: 'white',
    borderRadius: theme.borderRadius,
    boxShadow: '0 5px 10px 0 rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
})

class MoreActionsButton extends React.PureComponent {
  state = {
    anchorEl: null,
  }

  handlePopupOpen = ({ currentTarget }) => {
    this.setState(state => ({
      anchorEl: state.anchorEl ? null : currentTarget,
    }))
  }

  handlePopupBlur = () => {
    this.setState({
      anchorEl: null,
    })
  }

  render() {
    const { children, classes } = this.props
    const { anchorEl } = this.state
    const open = !!anchorEl
    return (
      <>
        <IconButton
          round
          type="secondary"
          icon={MoreOptionsIcon}
          onClick={this.handlePopupOpen}
        />
        <ArrowPopup
          open={open}
          anchorEl={anchorEl}
          onClose={this.handlePopupBlur}
        >
          <MenuList onClick={this.handlePopupBlur} className={classes.list}>
            {children}
          </MenuList>
        </ArrowPopup>
      </>
    )
  }
}

export default injectStyles(styles)(MoreActionsButton)
