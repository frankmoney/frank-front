// @flow strict-local
import React from 'react'
import cx from 'classnames'
import CurrencyProvider from 'components/CurrencyProvider'
import { type CurrencyCode } from 'contexts/CurrencyContext'
import type { Story as StoryProps } from 'data/models/stories'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import Story from './Story'

const styles = {
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    padding: [9, 15, 0, 17],
    margin: [0, -15],
    overflowY: 'scroll',
  },
}

type Props = {|
  ...InjectStylesProps,
  //
  accountId: string | number,
  stories: Array<StoryProps>,
  currencyCode?: CurrencyCode,
|}

const StoriesTab = ({
  accountId,
  classes,
  className,
  stories,
  currencyCode = 'USD',
}: Props) => (
  <div className={cx(classes.root, className)}>
    <CurrencyProvider code={currencyCode}>
      {stories.map(({ id, ...story }) => (
        <Story accountId={accountId} key={id} storyId={id} {...story} />
      ))}
    </CurrencyProvider>
  </div>
)

export default injectStyles(styles)(StoriesTab)
