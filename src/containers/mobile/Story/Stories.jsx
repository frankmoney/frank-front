// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import CurrencyProvider from 'components/CurrencyProvider'
import { type CurrencyCode } from 'contexts/CurrencyContext'
import Story from 'components/widgets/Tabs/StoriesTab/Story'
import { type AccountId } from 'data/models/account'
import { type Story as StoryProps } from 'data/models/stories'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import { ROUTES } from 'const'
import { createMobileUrl } from '../utils'

const styles = {
  root: {
    background: '#F4F4F6',
    marginTop: 16,
  },
  story: {
    padding: [20, 20, 24],
    marginBottom: 20,
    background: '#fff',
  },
}

type Props = {|
  ...InjectStylesProps,
  //
  accountId: AccountId,
  stories: Array<StoryProps>,
  currencyCode: CurrencyCode,
|}

const Stories = ({
  accountId,
  classes,
  className,
  currencyCode = 'USD',
  stories,
}: Props) => (
  <div className={cx(classes.root, className)}>
    <CurrencyProvider code={currencyCode}>
      {stories.map(({ id, ...story }) => (
        <Story
          className={classes.story}
          key={id}
          component={Link}
          to={createMobileUrl(ROUTES.account.stories.idRoot, {
            accountId,
            storyId: id,
          })}
          {...story}
        />
      ))}
    </CurrencyProvider>
  </div>
)

export default injectStyles(styles)(Stories)
