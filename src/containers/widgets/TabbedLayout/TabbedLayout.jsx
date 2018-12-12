// @flow strict-local
import * as React from 'react'
import { Header, HeaderItem } from './Header'

export type WidgetTab = 'overview' | 'payments' | 'stories' | 'about'

export const PAYMENTS_TAB: WidgetTab = 'payments'

type TabRenderer = React.Element<any> // flowlint-line unclear-type:off

type Props = {|
  className?: string,
  tab?: ?WidgetTab,
  //
  AboutTab: TabRenderer,
  OverviewTab: TabRenderer,
  PaymentListTab: TabRenderer,
  StoriesTab: TabRenderer,
|}

type State = {|
  tab: WidgetTab,
|}

class TabbedLayout extends React.PureComponent<Props, State> {
  state = {
    tab: 'overview',
  }

  handleTabSwitch = (tab: WidgetTab) => () => {
    this.setState({ tab })
  }

  render() {
    const {
      className,
      AboutTab,
      StoriesTab,
      OverviewTab,
      PaymentListTab,
    } = this.props
    const tab = this.props.tab || this.state.tab
    const isOverviewTab = tab === 'overview'
    const isPaymentListTab = tab === 'payments'
    const isStoriesTab = tab === 'stories'
    const isAboutTab = tab === 'about'

    return (
      <div className={className}>
        {!isPaymentListTab && (
          <Header>
            <HeaderItem
              name="Payments"
              active={isOverviewTab}
              onClick={this.handleTabSwitch('overview')}
            />
            <HeaderItem
              name="Stories"
              active={isStoriesTab}
              onClick={this.handleTabSwitch('stories')}
            />
            <HeaderItem
              name="About"
              active={isAboutTab}
              onClick={this.handleTabSwitch('about')}
            />
          </Header>
        )}
        {isOverviewTab && OverviewTab}
        {isPaymentListTab && PaymentListTab}
        {isStoriesTab && StoriesTab}
        {isAboutTab && AboutTab}
      </div>
    )
  }
}

export default TabbedLayout
