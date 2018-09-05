import React from 'react'
import { compose, branch, renderComponent, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { injectStyles } from '@frankmoney/ui'
import { PageLoader } from '@frankmoney/components'
import { createStructuredSelector } from 'reselect'
import styles from './Onboarding.jss'
import { currentStepSelector } from './selectors'
import AccountInfo from './Steps/AccountInfo'

const Onboarding = ({ currentStep, ...props }) => <AccountInfo {...props} />

const mapStateToProps = createStructuredSelector({
  currentStep: currentStepSelector,
})

export default compose(
  connect(mapStateToProps),
  lifecycle({
    // componentWillMount() {
    //   if (!this.props.loaded) {
    //     this.props.load()
    //   }
    // },
    componentWillUnmount() {
      this.props.leave()
    },
  }),
  branch(props => props.loading, renderComponent(PageLoader)),
  injectStyles(styles, { grid: true })
)(Onboarding)
