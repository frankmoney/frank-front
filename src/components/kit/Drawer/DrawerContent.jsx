// @flow strict-local
import React from 'react'
import cx from 'classnames'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import { injectStyles } from 'utils/styles'
import unsafeFindDOMNode from 'utils/dom/unsafeFindDOMNode'
import { DRAWER_INSET } from './styles'

const styles = {
  root: {
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
    flex: '1 1 auto',
  },
  overflowTop: {
    borderTop: '1px solid rgba(0,0,0,0.07)',
  },
  overflowBottom: {
    borderBottom: '1px solid rgba(0,0,0,0.07)',
  },
  inset: {
    padding: [0, DRAWER_INSET],
  },
}

class DrawerContent extends React.Component {
  static defaultProps = {
    disableOverflowTop: false,
    disableOverflowBottom: false,
    inset: false,
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
    this.element = unsafeFindDOMNode(ref)
  }

  handleScroll = throttle(() => {
    this.checkOverflow()
  }, 100)

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
      inset,
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
            [classes.inset]: inset,
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
