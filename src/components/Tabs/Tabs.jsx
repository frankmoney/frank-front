import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import chainCallbacks from 'utils/dom/chainCallbacks'

const styles = theme => ({
  root: {
    display: 'flex',
  },
})

class Tabs extends React.Component {
  state = {
    value: this.props.defaultValue,
  }

  get isControlled() {
    return typeof this.props.value !== 'undefined'
  }

  get value() {
    return this.isControlled ? this.props.value : this.state.value
  }

  changeTab = value => {
    if (!this.isControlled) {
      this.setState({ value }, () => {
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(this.state.value)
        }
      })
    } else if (typeof this.props.onChange === 'function') {
      this.props.onChange(value)
    }
  }

  handleTabClick = event => {
    const value = event.currentTarget.dataset.tab
    this.changeTab(value)
  }

  render() {
    const { classes, className, children } = this.props

    return (
      <div className={cx(classes.root, className)}>
        {React.Children.map(children, tab => {
          const value = tab.props.value

          if (typeof value === 'undefined' || value === null) {
            throw new Error('every TabItem should have value property')
          }

          // TODO tabindex and focus handling, select with Enter
          return React.cloneElement(tab, {
            active: this.value === value,
            'data-tab': tab.props.value,
            onClick: chainCallbacks(this.handleTabClick, tab.props.onClick),
          })
        })}
      </div>
    )
  }
}

export default injectStyles(styles)(Tabs)
