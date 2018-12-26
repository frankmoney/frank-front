// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import colors from 'styles/colors'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import ButtonWidgetButton from './ButtonWidgetButton'

const styles = theme => ({
  // Wrapper
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
    width: ({ width }) => width,
  },
  button: {
    margin: [0, -1],
    width: ({ width }) => width,
  },
  // Actual widget content
  contentRoot: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  period: {
    display: 'flex',
    padding: [4, 0, 11, 2],
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    margin: [0, -15],
    overflowY: 'scroll',
    padding: [0, 15],
  },
  pieChart: {
    margin: [15, 'auto'],
    position: 'relative',
  },
  overviewFooter: {
    ...theme.fontRegular(18, 26),
    margin: [18, 0, 13],
  },
  overviewFooterSeeAll: {
    flexGrow: 1,
    marginRight: -2,
    textAlign: 'right',
  },
  payments: {
    margin: [-3, -9, 0],
  },
})

type Props = {|
  ...InjectStylesProps,
  //
  children: React.Node,
  open: boolean, // demo flag
  width: number,
|}

type State = {|
  open: boolean,
|}

class ButtonWidgetExpander extends React.PureComponent<Props, State> {
  static defaultProps = {
    open: false,
  }

  state = {
    open: this.props.open,
  }

  handleClose = () => this.setState({ open: false })
  handleOpen = () => this.setState({ open: true })

  render() {
    const { children, classes, className } = this.props
    const { open } = this.state

    if (open) {
      return (
        <div className={cx(classes.root, className)}>
          {children}
          <ButtonWidgetButton
            className={classes.button}
            onClose={this.handleClose}
            open={open}
          />
        </div>
      )
    }

    return (
      <ButtonWidgetButton
        onClick={this.handleOpen}
        open={open}
        subtitle="See realtime report"
        title="We’re transparent"
      />
    )
  }
}

export default injectStyles(styles)(ButtonWidgetExpander)
