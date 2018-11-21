// @flow
import React from 'react'
import cx from 'classnames'
import { ArrowBack } from 'material-ui-icons'
import Button, { TextButton } from 'components/kit/Button'
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
  nextButtonProps,
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
          <TextButton
            label={backLabel}
            color="gray"
            icon={<ArrowBack />}
            onClick={onBack}
            loading={loadingBack}
          />
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
          {...nextButtonProps}
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
  nextButtonProps: { width: 160 },
  backLabel: 'Back',
  centered: false,
}

export default injectStyles(styles)(StepLayout)
