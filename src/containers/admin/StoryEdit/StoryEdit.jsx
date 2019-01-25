// @flow strict-local
import React from 'react'
import { createRouteUrl } from '@frankmoney/utils'
import * as R from 'ramda'
import cx from 'classnames'
import { compose, lifecycle, branch, renderComponent } from 'recompose'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  FixedHeader,
  Breadcrumbs,
  BreadcrumbsItem,
  BreadcrumbsItemLink,
} from '@frankmoney/components'
import AreaSpinner from 'components/AreaSpinner'
import SidebarSnack from 'components/SidebarSnack/SidebarSnack'
import { ROUTES } from 'const'
import { currentAccountIdSelector } from 'redux/selectors/user'
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

type Props = {|
  ...InjectStylesProps,
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
      message="Attach payments, add titile and story text to publish"
      dismissByTimeout={3000}
      onDismiss={() => showCanNotPublishSnack({ show: false })}
    />
  </div>
)

const mapStateToProps = createStructuredSelector({
  loaded: loadedSelector,
  accountId: currentAccountIdSelector,
  story: storySelector,
  canNotPublishSnackShown: canNotPublishSnackShownSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    load: ACTIONS.load,
    leave: ACTIONS.leave,
    showCanNotPublishSnack: ACTIONS.showCanNotPublishSnack,
  },
])

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
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
