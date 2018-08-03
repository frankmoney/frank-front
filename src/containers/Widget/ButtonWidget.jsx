import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import colors from 'styles/colors'
import Footer from './Footer'
import { Header, HeaderItem } from './Header'

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
    marginBottom: 21,
    minHeight: 62,
  },
  headerItem: {
    padding: [19, 1, 0],
  },
  live: {
    right: 0,
    top: 21,
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

    const isStories = tab === 'stories'
    const isIncome = tab === 'income'
    const isExpenses = tab === 'expenses'

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
        <Header
          className={classes.header}
          itemClassName={classes.headerItem}
          liveClassName={classes.live}
        >
          <HeaderItem
            active={isStories}
            name="Stories"
            onClick={this.switchTab('stories')}
          />
          <HeaderItem
            active={isExpenses}
            name="Expenses"
            onClick={this.switchTab('expenses')}
          />
          <HeaderItem
            active={isIncome}
            name="Income"
            onClick={this.switchTab('income')}
          />
        </Header>
        {isStories && <Stories />}
        {(isIncome || isExpenses) && <Charts />}
        <Footer onClose={this.handleClose} />
      </div>
    )
  }
}

ButtonWidget.propTypes = {
  charts: PropTypes.element,
  expanded: PropTypes.bool,
  stories: PropTypes.element,
  tab: PropTypes.oneOf(['stories', 'expenses', 'income']),
}

ButtonWidget.defaultProps = {
  tab: 'stories',
}

export default injectStyles(styles)(ButtonWidget)
