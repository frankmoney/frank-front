// @flow strict-local
import * as React from 'react'
import { Popover } from 'material-ui'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import type { PieChartCategory } from 'data/models/pieData'

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

type Props = {|
  ...InjectStylesProps,
  //
  categories: Array<PieChartCategory>,
  children: React.Element<any>, // flowlint-line unclear-type:warn
  renderTooltipItem: PieChartCategory => React.Node,
|}

type State = {|
  anchorEl: React.Node,
|}

class OtherCategories extends React.PureComponent<Props, State> {
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
      <>
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
        {React.cloneElement(children, {
          onMouseEnter: this.handlePopoverOpen,
          onMouseLeave: this.handlePopoverClose,
        })}
      </>
    )
  }
}

export default injectStyles(styles)(OtherCategories)
