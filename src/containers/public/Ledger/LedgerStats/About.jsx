import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import Truncate from 'react-truncate'
import styles from './LedgerStats.jss'

class About extends React.Component {
  state = {
    truncated: false,
    expanded: false,
  }

  handleTruncate = truncated => {
    if (this.state.truncated !== truncated) {
      this.setState({
        truncated,
      })
    }
  }

  handleToggle = () => {
    this.setState({
      expanded: !this.state.expanded,
    })
  }

  render() {
    const {
      classNames: {
        root: rootClassName,
        text: textClassName,
        handler: handlerClassName,
      } = {},
      maxLines,
      children,
    } = this.props
    const { expanded, truncated } = this.state
    return (
      <div className={rootClassName}>
        <div className={textClassName}>
          <Truncate
            lines={!expanded ? maxLines : 100}
            onTruncate={this.handleTruncate}
          >
            {children}
          </Truncate>
        </div>
        {(truncated || expanded) && (
          <div className={handlerClassName} onClick={this.handleToggle}>
            {expanded ? 'Hide' : 'Read more'}
          </div>
        )}
      </div>
    )
  }
}

export default injectStyles(styles)(About)
