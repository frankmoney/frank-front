// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { findDOMNode } from 'react-dom'
import debounce from 'lodash/debounce'
import { injectStyles } from 'utils/styles'

const styles = {
  root: {
    overflow: 'auto',
    flex: '1 1 auto',
  },
  overflowTop: {
    borderTop: '1px solid rgba(0,0,0,0.07)',
  },
  overflowBottom: {
    borderBottom: '1px solid rgba(0,0,0,0.07)',
  },
}

class DrawerContent extends React.Component {
  static defaultProps = {
    disableOverflowTop: false,
    disableOverflowBottom: false,
  }

  state = {
    overflow: false,
  }

  componentDidMount() {
    this.checkOverflow()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleRef = ref => {
    this.element = findDOMNode(ref) // eslint-disable-line react/no-find-dom-node
  }

  handleScroll = debounce(() => {
    this.checkOverflow()
  }, 50)

  handleResize = debounce(() => {
    this.checkOverflow()
  }, 200)

  checkOverflow = () => {
    if (!this.element) {
      return
    }

    let overflow = this.element.scrollHeight > this.element.clientHeight
    if (overflow) {
      overflow = []

      if (this.element.scrollTop > 0) {
        overflow.push('top')
      }

      if (
        this.element.scrollTop + this.element.clientHeight <
        this.element.scrollHeight
      ) {
        overflow.push('bottom')
      }

      overflow = overflow.join(',')
    }

    if (this.state.overflow !== overflow) {
      this.setState({ overflow }, () => {
        if (typeof this.props.onChangeOverflow === 'function') {
          this.props.onChangeOverflow(overflow)
        }
      })
    }
  }

  render() {
    const {
      classes,
      className,
      theme,
      disableOverflowTop,
      disableOverflowBottom,
      ...otherProps
    } = this.props
    const { overflow } = this.state

    return (
      <div
        ref={this.handleRef}
        onScroll={this.handleScroll}
        className={cx(
          classes.root,
          {
            [classes.overflowTop]:
              !disableOverflowTop && overflow && overflow.includes('top'),
            [classes.overflowBottom]:
              !disableOverflowBottom && overflow && overflow.includes('bottom'),
          },
          className
        )}
        {...otherProps}
      />
    )
  }
}

export default injectStyles(styles)(DrawerContent)
