import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { Popover } from 'material-ui'
import { ArrowDropDown } from 'material-ui-icons'
import { CheckedMenuList } from '@frankmoney/components'

const styles = theme => ({
  root: {},
  selectedColor: {
    ...theme.fontMedium(22, 26),
    height: 26,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: props => props.value,
  },
  selectedColorIndicator: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    marginRight: 8,
    backgroundColor: props => props.value,
  },
  arrow: {
    width: 24,
    height: 24,
    position: 'relative',
    marginLeft: 5,
  },
  popover: {
    width: 255,
    maxHeight: 5 * theme.menuItemHeight,
  },
})

class ColorSelect extends React.Component {
  state = {
    anchorEl: null,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ anchorEl: null })
    }
  }

  handleLabelClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const {
      classes,
      className,
      value,
      getColorName,
      children,
      onChange,
    } = this.props

    const colorName = getColorName(value)
    const backdropProps = {
      invisible: false,
    }

    const origin = {
      vertical: 'top',
      horizontal: 'left',
    }

    return [
      <div
        className={cx(classes.selectedColor, className)}
        onClick={this.handleLabelClick}
        key="value"
      >
        <div className={classes.selectedColorIndicator} />
        {colorName}
        <ArrowDropDown className={classes.arrow} />
      </div>,
      <Popover
        open={!!this.state.anchorEl}
        anchorEl={this.state.anchorEl}
        anchorOrigin={origin}
        onClose={this.handleClose}
        transformOrigin={origin}
        BackdropProps={backdropProps}
        classes={{ paper: classes.popover }}
      >
        <CheckedMenuList>
          {React.Children.map(children, item =>
            React.cloneElement(item, {
              selected: value === item.props.color,
              onClick: () => onChange(item.props.color),
            })
          )}
        </CheckedMenuList>
      </Popover>,
    ]
  }
}

ColorSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
}

ColorSelect.defaultProps = {
  getColorName: () => '',
}

export default injectStyles(styles)(ColorSelect)
