import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import { ClickAway, Popper } from '@frankmoney/components'
import Arrow from './arrow.svg'

const styles = {
  popper: {
    zIndex: 100,
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: -30,
    },
    '&[x-placement*="bottom"] $arrow svg': {},
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: -30,
      transform: 'rotate(180deg)',
    },
    '&[x-placement*="top"] $arrow svg': {
      filter: `drop-shadow(0px -5px 3px rgba(0, 0, 0, 0.12));`,
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: -37,
      transform: 'rotate(-90deg)',
    },
    '&[x-placement*="right"] $arrow svg': {
      filter: `drop-shadow(-2px -3px 2px rgba(0, 0, 0, 0.12))`,
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: -37,
      transform: 'rotate(90deg)',
    },
    '&[x-placement*="left"] $arrow svg': {
      filter: `drop-shadow(2px -3px 2px rgba(0, 0, 0, 0.12))`,
    },
  },
  arrow: {
    zIndex: 5,
    position: 'absolute',
    width: 31,
    height: 16,
  },
}

class ArrowPopup extends React.PureComponent {
  state = {
    arrowEl: null,
    anchorEl: null,
  }

  handleClickAway = () => {
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  handleArrowEl = node => {
    this.setState({
      arrowEl: node,
    })
  }

  render() {
    const { children, classes, anchorEl } = this.props
    const { arrowEl } = this.state
    const open = !!anchorEl

    return (
      <Popper
        open={open}
        anchorEl={anchorEl}
        className={classes.popper}
        modifiers={{
          arrow: {
            enabled: true,
            element: arrowEl,
          },
          offset: {
            enabled: true,
            offset: '0, 25',
          },
        }}
      >
        <ClickAway onClickAway={this.handleClickAway}>
          <div className={classes.root}>
            {children}
            <div className={classes.arrow} ref={this.handleArrowEl}>
              <Arrow className={classes.arrowIcon} />
            </div>
          </div>
        </ClickAway>
      </Popper>
    )
  }
}

export default injectStyles(styles)(ArrowPopup)
