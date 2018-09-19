import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import colors from 'styles/colors'
import Widget from '../Widget'
import Footer from './Footer'

const WIDTH = 375

const styles = theme => ({
  root: {
    ...theme.fontRegular(16, 26),
    background: '#FFFFFF',
    border: '1px solid #fff',
    borderRadius: 8,
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.07)',
    color: colors.black,
    display: 'flex',
    flexDirection: 'column',
    height: 720,
    padding: [0, 18, 59],
    position: 'relative',
    width: WIDTH,
  },
  footer: {
    margin: [0, -1],
    width: WIDTH,
  },
})

// FIXME: correct values
const barsHeight = R.cond([
  [R.equals(500), R.always(146)],
  [R.equals(625), R.always(198)],
  [R.equals(800), R.always(203)],
  [R.T, R.always(0)],
])

class ButtonWidget extends React.PureComponent {
  state = {
    expanded: this.props.expanded,
    tab: this.props.tab,
  }

  handleClose = () => this.setState({ expanded: false })
  handleOpen = () => this.setState({ expanded: true })

  switchTab = tab => () => this.setState({ tab })

  render() {
    const { classes, className } = this.props
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
        <Widget barsHeight={barsHeight} {...this.props} />
        <Footer className={classes.footer} onClose={this.handleClose} />
      </div>
    )
  }
}

ButtonWidget.propTypes = {
  expanded: PropTypes.bool,
  stories: PropTypes.element,
  tab: PropTypes.oneOf(['payments', 'stories', 'about']),
}

ButtonWidget.defaultProps = {
  tab: 'payments',
}

export default injectStyles(styles)(ButtonWidget)
