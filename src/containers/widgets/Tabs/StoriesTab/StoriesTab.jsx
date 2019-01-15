// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { createRouteUrl } from '@frankmoney/utils'
import CurrencyProvider from 'components/CurrencyProvider'
import { type CurrencyCode } from 'contexts/CurrencyContext'
import { type AccountId } from 'data/models/account'
import type { Story as StoryProps } from 'data/models/stories'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import { ROUTES } from 'const'
import Story, { type ImageBorderRadius } from './Story'

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
  accountId: AccountId,
  currencyCode?: CurrencyCode,
  stories: Array<StoryProps>,
  storyClassName?: string,
  storyImageBorderRadius: ImageBorderRadius,
  storyImageClassName?: string,
  storyStatsClassName?: string,
  storySymbolClassName?: string,
  storyTitleClassName?: string,
|}

const StoriesTab = ({
  accountId,
  classes,
  className,
  stories,
  storyClassName,
  storyImageBorderRadius,
  storyImageClassName,
  storyStatsClassName,
  storySymbolClassName,
  storyTitleClassName,
  currencyCode = 'USD',
}: Props) => (
  <div className={cx(classes.root, className)}>
    <CurrencyProvider code={currencyCode}>
      {stories.map(({ id, ...story }) => (
        <Story
          className={storyClassName}
          imageBorderRadius={storyImageBorderRadius}
          imageClassName={storyImageClassName}
          component={'a'}
          key={id}
          href={createRouteUrl(ROUTES.account.stories.idRoot, {
            accountId,
            storyId: id,
          })}
          statsClassName={storyStatsClassName}
          symbolClassName={storySymbolClassName}
          target="blank"
          titleClassName={storyTitleClassName}
          {...story}
        />
      ))}
    </CurrencyProvider>
  </div>
)

export default injectStyles(styles)(StoriesTab)
