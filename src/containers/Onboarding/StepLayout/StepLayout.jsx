// @flow
import React from 'react'
import cx from 'classnames'
import Button from 'components/kit/Button'
import FrankLogo from 'components/Logo'
import { injectStyles } from 'utils/styles'
import styles from './StepLayout.jss'

const StepLayout = ({
  classes,
  className,
  canGoBack,
  canGoNext,
  loadingNext,
  loadingBack,
  nextLabel,
  backLabel,
  onNext,
  onBack,
  noFooter,
  footerText,
  footerButton,
  centered,
  children,
}) => (
  <div className={cx(classes.root, centered && classes.centered, className)}>
    <FrankLogo className={classes.logo} />
    <div className={classes.container}>{children}</div>
    {!noFooter && (
      <div className={classes.footer}>
        {canGoBack ? (
          <Button label={backLabel} onClick={onBack} loading={loadingBack} />
        ) : (
          <div />
        )}
        {footerText && <div className={classes.footerText}>{footerText}</div>}
        {footerButton && (
          <div className={classes.footerButtonWrap}>{footerButton}</div>
        )}
        <Button
          label={nextLabel}
          color="green"
          disabled={!canGoNext}
          loading={loadingNext}
          onClick={onNext}
        />
      </div>
    )}
  </div>
)

StepLayout.defaultProps = {
  nextLabel: 'Continue',
  backLabel: 'Back',
  centered: false,
}

export default injectStyles(styles)(StepLayout)
