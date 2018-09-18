import React, { Fragment, cloneElement } from 'react'
import { injectStyles } from '@frankmoney/ui'
import { Popover } from 'material-ui'

const styles = {
  tooltip: {
    pointerEvents: 'none',
  },
  paper: {
    padding: 15,
  },
}

const popoverProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  transformOrigin: {
    vertical: -10,
    horizontal: 'left',
  },
  getContentAnchorEl: null,
}

class OtherCategories extends React.PureComponent {
  state = {
    anchorEl: null,
  }

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handlePopoverClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { categories, children, classes, renderTooltipItem } = this.props
    const { anchorEl } = this.state
    const open = !!anchorEl
    return (
      <Fragment>
        <Popover
          open={open}
          anchorEl={anchorEl}
          className={classes.tooltip}
          classes={{ paper: classes.paper }}
          onClose={this.handlePopoverClose}
          disableRestoreFocus
          {...popoverProps}
        >
          {categories.map(renderTooltipItem)}
        </Popover>
        {cloneElement(children, {
          onMouseEnter: this.handlePopoverOpen,
          onMouseLeave: this.handlePopoverClose,
        })}
      </Fragment>
    )
  }
}

export default injectStyles(styles)(OtherCategories)
