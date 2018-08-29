import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import colors from 'styles/colors'
import { Header, HeaderItem } from './Header'

const styles = theme => ({
  root: {
    ...theme.fontRegular(16, 26),
    background: '#FFFFFF',
    border: '1px solid #E9EAEC',
    borderRadius: 8,
    color: colors.black,
    display: 'flex',
    flexDirection: 'column',
    padding: [0, 18, 19],
    justifyContent: 'space-between',
  },
  size400: {
    width: 400,
    height: 275,
  },
  size500: {
    width: 500,
    height: 345,
  },
  size625: {
    width: 625,
    height: 430,
  },
  size800: {
    height: 550,
    minHeight: 550,
    width: 800,
  },
})

class InlineWidget extends React.PureComponent {
  state = {
    tab: this.props.tab,
  }

  switchTab = tab => () => this.setState({ tab })

  render() {
    const {
      classes,
      className,
      stories: Stories,
      charts: Charts,
      size,
    } = this.props
    const { tab } = this.state

    const isPayments = tab === 'payments'
    const isStories = tab === 'stories'
    const isAbout = tab === 'about'

    return (
      <div
        className={cx(
          classes.root,
          {
            [classes.size400]: size === 400,
            [classes.size500]: size === 500,
            [classes.size625]: size === 625,
            [classes.size800]: size === 800,
          },
          className
        )}
      >
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
        {isPayments && <Charts size={size} period="All time" />}
        {isStories && <Stories />}
        {isAbout && <div>TODO</div>}
      </div>
    )
  }
}

InlineWidget.propTypes = {
  charts: PropTypes.element,
  stories: PropTypes.element,
  tab: PropTypes.oneOf(['payments', 'stories', 'about']),
  size: PropTypes.oneOf([400, 500, 625, 800]).isRequired,
}

InlineWidget.defaultProps = {
  tab: 'payments',
}

export default injectStyles(styles)(InlineWidget)