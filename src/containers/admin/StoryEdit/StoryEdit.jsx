import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import { compose, lifecycle, branch, renderComponent } from 'recompose'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { injectStyles } from '@frankmoney/ui'
import {
  PageLoader,
  FixedHeader,
  Breadcrumbs,
  BreadcrumbsItem,
} from '@frankmoney/components'
import HeaderBarButtons from './HeaderBarButtons'
import { isNewStorySelector, loadedSelector } from './selectors'
import ACTIONS from './actions'
import StoryEditForm from './StoryEditForm'
import styles from './StoryEdit.jss'

const StoryEdit = ({ classes, className, isNew }) => (
  <div className={cx(classes.root, className)}>
    <FixedHeader>
      <Breadcrumbs>
        <BreadcrumbsItem>{isNew ? 'New story' : 'Edit story'}</BreadcrumbsItem>
      </Breadcrumbs>
      <HeaderBarButtons />
    </FixedHeader>
    <StoryEditForm className={classes.form} />
  </div>
)

const mapStateToProps = createStructuredSelector({
  loaded: loadedSelector,
  isNew: isNewStorySelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    load: ACTIONS.load,
    leave: ACTIONS.leave,
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
  branch(props => !props.loaded, renderComponent(PageLoader)),
  injectStyles(styles, { fixedGrid: true })
)(StoryEdit)
