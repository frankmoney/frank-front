import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import colors from 'styles/colors'
import { Header, HeaderItem } from '../Header'
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

class ButtonWidget extends React.PureComponent {
  state = {
    expanded: this.props.expanded,
    tab: this.props.tab,
  }

  handleClose = () => this.setState({ expanded: false })
  handleOpen = () => this.setState({ expanded: true })

  switchTab = tab => () => this.setState({ tab })

  render() {
    const { charts: Charts, classes, className, stories: Stories } = this.props
    const { expanded, tab } = this.state

    const isPayments = tab === 'payments'
    const isStories = tab === 'stories'
    const isAbout = tab === 'about'

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
        <Header>
          <HeaderItem
            name="Payments"
            active={isPayments}
            onClick={this.switchTab('payments')}
          />
          <HeaderItem
            name="Stories"
            active={isStories}
            onClick={this.switchTab('stories')}
          />
          <HeaderItem
            name="About"
            active={isAbout}
            onClick={this.switchTab('about')}
          />
        </Header>
        {isPayments && <Charts />}
        {isStories && <Stories />}
        {isAbout && <div>TODO</div>}
        <Footer className={classes.footer} onClose={this.handleClose} />
      </div>
    )
  }
}

ButtonWidget.propTypes = {
  charts: PropTypes.element,
  expanded: PropTypes.bool,
  stories: PropTypes.element,
  tab: PropTypes.oneOf(['payments', 'stories', 'about']),
}

ButtonWidget.defaultProps = {
  tab: 'stories',
}

export default injectStyles(styles)(ButtonWidget)
