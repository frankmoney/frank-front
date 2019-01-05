// @flow strict-local
import * as React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import { type EditorState } from 'draft-js'
import { compose, lifecycle, branch, renderComponent } from 'recompose'
import { Link } from 'react-router-dom'
import ArrowBackIcon from 'material-ui-icons/ArrowBack'
import { createRouteUrl } from '@frankmoney/utils'
import AreaSpinner from 'components/AreaSpinner'
import { IconPlainButton } from 'components/kit/Button'
import CurrencyProvider from 'components/CurrencyProvider'
import StoryPaymentsStats from 'components/StoryPaymentsStats'
import ShareButtons from 'components/common/ShareButtons'
import Editor from 'components/kit/Editor'
import { type Account, type AccountId } from 'data/models/account'
import { type Payment } from 'data/models/payment'
import { type Story as StoryProps, type StoryId } from 'data/models/stories'
import reconnect from 'utils/reconnect'
import {
  accountSelector,
  isLoadedSelector,
  storySelector,
  storyEditorStateSelector,
} from 'containers/public/Story/selectors'
import ACTIONS from 'containers/public/Story/actions'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import { ROUTES } from 'const'
import { createMobileUrl } from '../utils'
import StoryPayment from './StoryPayment'

const styles = theme => ({
  root: {
    padding: 20,
  },
  header: {
    ...theme.fontMedium(20, 24),
    display: 'flex',
    alignItems: 'center',
    color: '#9295A1',
  },
  back: {
    color: '#9295A1',
    marginRight: 15,
  },
  accountName: {
    ...theme.fontMedium(20, 28),
    marginTop: 42,
  },
  title: {
    ...theme.fontSemibold(38, 42),
    marginTop: 16,
  },
  coverWrapper: {
    margin: [21, -20, -21],
  },
  cover: {
    width: '100%',
  },
  stats: {
    display: 'block',
    marginTop: 15,
  },
  statsSymbol: {
    display: 'none',
  },
  paymentCount: {
    whiteSpace: 'nowrap',
    display: 'inline-block',
  },
  dateRange: {
    whiteSpace: 'nowrap',
    display: 'inline-block',
    lineHeight: 35,
  },
  share: {
    marginTop: 24,
  },
  text: {
    marginTop: 34,
  },
  payments: {
    margin: [30, -20, 0],
    borderTop: '20px solid #F4F4F6',
  },
  paymentsTitle: {
    ...theme.fontMedium(26, 32),
    margin: [27, 20, 16],
  },
  bottomShare: {
    borderTop: '20px solid #F4F4F6',
    margin: [0, -20],
    padding: [11, 20],
  },
  shareTitle: {
    ...theme.fontMedium(26, 32),
    margin: [11, 0, 26],
  },
})

type StoryWithPayments = {|
  ...StoryProps,
  payments: Array<Payment>,
|}

type Props = {|
  ...InjectStylesProps,
  //
  accountId: AccountId,
  storyId: StoryId,
  //
  account: Account,
  story: StoryWithPayments,
  editorState?: EditorState,
|}

const Story = ({
  account: { id: accountId, name: accountName, currencyCode },
  classes,
  className,
  story: {
    cover,
    id: storyId,
    payments,
    paymentsCount,
    paymentsDateRange,
    title,
  },
  editorState,
}: Props) => (
  <div className={cx(classes.root, className)}>
    <div className={classes.header}>
      <Link
        to={createMobileUrl(ROUTES.account.stories.root, { accountId })}
        className={classes.back}
      >
        <IconPlainButton icon={<ArrowBackIcon />} />
      </Link>
      <span>All stories</span>
    </div>
    {cover && (
      <div className={classes.coverWrapper}>
        <img
          className={classes.cover}
          src={cover.thumbs.sized}
          alt="story cover"
        />
      </div>
    )}
    <CurrencyProvider code={currencyCode}>
      <div className={classes.accountName}>{accountName}</div>
      <div className={classes.title}>{title}</div>
      {paymentsCount > 0 && (
        <StoryPaymentsStats
          className={classes.stats}
          counterClassName={classes.paymentCount}
          dateRangeClassName={classes.dateRange}
          paymentsCount={paymentsCount}
          paymentsDateRange={paymentsDateRange}
          symbolClassName={classes.statsSymbol}
        />
      )}
      <ShareButtons
        className={classes.share}
        url={createRouteUrl(ROUTES.account.stories.idRoot, {
          accountId,
          storyId,
        })}
        small
        shortEmail
      />
      {editorState && (
        <Editor className={classes.text} editorState={editorState} readOnly />
      )}
      {paymentsCount > 0 && (
        <div className={classes.payments}>
          <div className={classes.paymentsTitle}>Attached payments</div>
          {R.map(
            ({ id, ...payment }) => (
              <StoryPayment
                key={id}
                payment={payment}
                to={createMobileUrl(ROUTES.account.payment.idRoot, {
                  accountId,
                  paymentId: id,
                })}
              />
            ),
            payments
          )}
        </div>
      )}
      <div className={classes.bottomShare}>
        <div className={classes.shareTitle}>Share story</div>
        <ShareButtons
          className={classes.share}
          url={createRouteUrl(ROUTES.account.stories.idRoot, {
            accountId,
            storyId,
          })}
          small
          shortEmail
        />
      </div>
    </CurrencyProvider>
  </div>
)

export default compose(
  reconnect(
    {
      isLoaded: isLoadedSelector,
      story: storySelector,
      account: accountSelector,
      editorState: storyEditorStateSelector,
    },
    {
      load: ACTIONS.load,
      leave: ACTIONS.leave,
    }
  ),
  lifecycle({
    componentWillMount() {
      if (!this.props.isLoaded) {
        this.props.load({
          accountId: this.props.accountId,
          storyId: this.props.storyId,
        })
      }
    },
    componentWillUnmount() {
      this.props.leave()
    },
  }),
  branch(props => !props.isLoaded, renderComponent(AreaSpinner)),
  injectStyles(styles)
)(Story)
