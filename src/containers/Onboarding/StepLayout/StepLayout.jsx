import * as R from 'ramda'
import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { injectStyles } from '@frankmoney/ui'
import { Button } from '@frankmoney/components'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import FrankLogo from 'components/Logo'
import * as ACTIONS from '../actions'
import { canGoBackSelector } from '../selectors'
import styles from './StepLayout.jss'

const StepLayout = ({
  classes,
  className,
  canGoBack,
  goNext,
  goBack,
  children,
}) => (
  <div className={cx(classes.root, className)}>
    <FrankLogo className={classes.logo} />
    <div className={classes.container}>{children}</div>
    <div className={classes.footer}>
      {canGoBack ? <Button label="Back" onClick={goBack} /> : <div />}
      <Button label="Continue" primary onClick={goNext} />
    </div>
  </div>
)

const mapStateToProps = createStructuredSelector({
  canGoBack: canGoBackSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    goNext: ACTIONS.goNext,
    goBack: ACTIONS.goBack,
  },
])

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectStyles(styles, { grid: true })
)(StepLayout)
