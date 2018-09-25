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
import {
  canGoBackSelector,
  canGoNextSelector,
  loadingBackSelector,
  loadingNextSelector,
} from '../selectors'
import styles from './StepLayout.jss'

const StepLayout = ({
  classes,
  className,
  canGoBack,
  canGoNext,
  loadingNext,
  loadingBack,
  goNext,
  goBack,
  noFooter,
  footerText,
  footerButton,
  children,
}) => (
  <div className={cx(classes.root, className)}>
    <FrankLogo className={classes.logo} />
    <div className={classes.container}>{children}</div>
    {!noFooter && (
      <div className={classes.footer}>
        {canGoBack ? (
          <Button label="Back" onClick={goBack} loading={loadingBack} />
        ) : (
          <div />
        )}
        {footerText && <div className={classes.footerText}>{footerText}</div>}
        {footerButton && (
          <div className={classes.footerButtonWrap}>{footerButton}</div>
        )}
        <Button
          label="Continue"
          type="primary"
          disabled={!canGoNext}
          loading={loadingNext}
          onClick={goNext}
        />
      </div>
    )}
  </div>
)

const mapStateToProps = createStructuredSelector({
  canGoBack: canGoBackSelector,
  canGoNext: canGoNextSelector,
  loadingNext: loadingNextSelector,
  loadingBack: loadingBackSelector,
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
