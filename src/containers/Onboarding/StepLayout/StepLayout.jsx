import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { Button } from '@frankmoney/components'
import FrankLogo from 'components/Logo'
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
  children,
}) => (
  <div className={cx(classes.root, className)}>
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
          type="primary"
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
}

export default injectStyles(styles)(StepLayout)
