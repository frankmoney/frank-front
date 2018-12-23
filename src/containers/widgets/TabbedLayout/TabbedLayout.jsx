// @flow strict-local
import * as React from 'react'
import { Header, HeaderItem } from './Header'

export type WidgetTab = 'overview' | 'payments' | 'stories' | 'about'

export const OVERVIEW_TAB: WidgetTab = 'overview'
export const PAYMENTS_TAB: WidgetTab = 'payments'

type TabRenderer = React.Element<any> // flowlint-line unclear-type:off

type Props = {|
  className?: string,
  hideAboutTab?: boolean,
  hideStoriesTab?: boolean,
  onTabSwitch: WidgetTab => void,
  tab: WidgetTab,
  //
  AboutTab: TabRenderer,
  OverviewTab: ?TabRenderer,
  PaymentListTab: ?TabRenderer,
  StoriesTab: TabRenderer,
|}

const TabbedLayout = ({
  className,
  hideAboutTab,
  hideStoriesTab,
  onTabSwitch,
  tab,
  AboutTab,
  StoriesTab,
  OverviewTab,
  PaymentListTab,
}: Props) => {
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
            onClick={() => onTabSwitch('overview')}
          />
          {!hideStoriesTab && (
            <HeaderItem
              name="Stories"
              active={isStoriesTab}
              onClick={() => onTabSwitch('stories')}
            />
          )}
          {!hideAboutTab && (
            <HeaderItem
              name="About"
              active={isAboutTab}
              onClick={() => onTabSwitch('about')}
            />
          )}
        </Header>
      )}
      {isOverviewTab && OverviewTab}
      {isPaymentListTab && PaymentListTab}
      {isStoriesTab && !hideStoriesTab && StoriesTab}
      {isAboutTab && !hideAboutTab && AboutTab}
    </div>
  )
}

export default TabbedLayout
