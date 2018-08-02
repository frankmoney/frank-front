import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import colors from 'styles/colors'
import Footer from './Footer'
import LiveIndicator from './LiveIndicator'

const styles = theme => ({
  root: {
    ...theme.fontRegular(16, 26),
    color: colors.black,
    background: '#FFFFFF',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    width: 375,
    height: 720,
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.07)',
    padding: [0, 20, 59],
    position: 'relative',
  },
  header: {
    display: 'flex',
    position: 'relative',
    borderBottom: '1px solid #E9EAEC',
    marginBottom: 21,
    minHeight: 62,
  },
  headerItem: {
    ...theme.fontRegular(20, 26),
    color: '#A8AAB4',
    cursor: 'pointer',
    padding: [19, 1, 0],
    '&:not(:first-child)': {
      marginLeft: 16,
    },
    '&$active': {
      color: '#252B43',
      borderBottom: '1px solid #252B43',
      marginBottom: -1,
    },
  },
  active: {},
  live: {
    right: 0,
    top: 21,
  },
})

class ButtonWidget extends React.PureComponent {
  state = {
    expanded: this.props.expanded,
  }

  handleClose = () => this.setState({ expanded: false })
  handleOpen = () => this.setState({ expanded: true })

  render() {
    const { classes, className, content: Content } = this.props
    const { expanded } = this.state

    if (!expanded) {
      return (
        <Footer
          button
          onClick={this.handleOpen}
          title="We’re transparent"
          subtitle="See realtime report"
        />
      )
    }

    return (
      <div className={cx(classes.root, className)}>
        <div className={classes.header}>
          <div className={cx(classes.headerItem, classes.active)}>Stories</div>
          <div className={classes.headerItem}>Expenses</div>
          <div className={classes.headerItem}>Income</div>
          <LiveIndicator className={classes.live} />
        </div>
        <Content />
        <Footer onClose={this.handleClose} />
      </div>
    )
  }
}

ButtonWidget.propTypes = {
  content: PropTypes.element,
  expanded: PropTypes.bool,
}

export default injectStyles(styles)(ButtonWidget)
