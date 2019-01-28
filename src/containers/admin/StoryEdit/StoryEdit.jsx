// @flow strict-local
import React from 'react'
import { createRouteUrl } from '@frankmoney/utils'
import cx from 'classnames'
import { compose, lifecycle, branch, renderComponent } from 'recompose'
import {
  FixedHeader,
  BreadcrumbsItem,
  BreadcrumbsItemLink,
} from '@frankmoney/components'
import AreaSpinner from 'components/AreaSpinner'
import Breadcrumbs from 'components/Breadcrumbs'
import SidebarSnack from 'components/SidebarSnack/SidebarSnack'
import { type AccountId } from 'data/models/account'
import { type Story } from 'data/models/stories'
import { ROUTES } from 'const'
import { currentAccountIdSelector } from 'redux/selectors/user'
import reconnect from 'utils/reconnect'
import { formatFullDate } from 'utils/datesLight'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import HeaderBarButtons from './HeaderBarButtons'
import {
  loadedSelector,
  storySelector,
  canNotPublishSnackShownSelector,
} from './selectors'
import ACTIONS from './actions'
import StoryEditForm from './StoryEditForm'
import styles from './StoryEdit.jss'

type SnackCb = Object => void // flowlint-line unclear-type: warn

type Props = {|
  ...InjectStylesProps,
  //
  accountId: AccountId,
  canNotPublishSnackShown: boolean,
  showCanNotPublishSnack: SnackCb,
  story: Story,
|}

const StoryEdit = ({
  classes,
  className,
  accountId,
  story: { publishedAt },
  canNotPublishSnackShown,
  showCanNotPublishSnack,
}: Props) => (
  // TODO ui-fixed class маркирует этот элемент чтобы любой другой элемент блочащий скролл страницы(через замену скроллбара) корректировал падинг и этого элемента
  <div className={cx(classes.root, className)}>
    <FixedHeader className="ui-fixed">
      <Breadcrumbs>
        <BreadcrumbsItemLink
          to={createRouteUrl(ROUTES.account.stories.root, { accountId })}
        >
          Stories
        </BreadcrumbsItemLink>
        <BreadcrumbsItem>
          {publishedAt ? (
            <>
              Published story&nbsp;
              <span className={classes.publicationDate}>
                {formatFullDate(publishedAt)}
              </span>
            </>
          ) : (
            'Draft'
          )}
        </BreadcrumbsItem>
      </Breadcrumbs>
      <HeaderBarButtons />
    </FixedHeader>
    <StoryEditForm className={classes.form} />
    <SidebarSnack
      color="red"
      shown={canNotPublishSnackShown}
      message="Attach payments, add title and story text to publish"
      dismissByTimeout={3000}
      onDismiss={() => showCanNotPublishSnack({ show: false })}
    />
  </div>
)

export default compose(
  reconnect(
    {
      accountId: currentAccountIdSelector,
      canNotPublishSnackShown: canNotPublishSnackShownSelector,
      loaded: loadedSelector,
      story: storySelector,
    },
    {
      leave: ACTIONS.leave,
      load: ACTIONS.load,
      showCanNotPublishSnack: ACTIONS.showCanNotPublishSnack,
    }
  ),
  lifecycle({
    componentWillMount() {
      if (!this.props.loaded) {
        this.props.load(this.props.storyId)
      }
    },
    componentWillUnmount() {
      this.props.leave()
    },
  }),
  branch(props => !props.loaded, renderComponent(AreaSpinner)),
  injectStyles(styles, { fixedGrid: true })
)(StoryEdit)
