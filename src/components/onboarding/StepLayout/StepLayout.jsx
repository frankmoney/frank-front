// @flow
import React from 'react'
import cx from 'classnames'
import { ArrowBack } from 'material-ui-icons'
import { Link } from 'react-router-dom'
import Button, { TextButton } from 'components/kit/Button'
import FrankLogo from 'components/Logo'
import { injectStyles } from 'utils/styles'
import resetScrollPositionOnMount from 'utils/resetScrollPositionOnMount'
import { ROUTES } from 'const'
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
  backButtonProps,
  onNext,
  onBack,
  noFooter,
  footerText,
  footerButton,
  centered,
  children,
}) => (
  <div
    className={cx(
      classes.root,
      {
        [classes.centered]: centered,
        [classes.disabled]: loadingNext || loadingBack,
      },
      className
    )}
  >
    <Link to={ROUTES.root}>
      <FrankLogo className={classes.logo} />
    </Link>
    <div className={classes.container}>{children}</div>
    {!noFooter && (
      <div className={classes.footer}>
        {canGoBack ? (
          <TextButton
            label={backLabel}
            color="gray"
            icon={<ArrowBack />}
            loading={loadingBack}
            disabled={loadingNext}
            onClick={typeof onBack === 'function' ? () => onBack() : null}
            {...backButtonProps}
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
          disabled={!canGoNext || loadingBack}
          loading={loadingNext}
          onClick={typeof onNext === 'function' ? () => onNext() : null}
        />
      </div>
    )}
  </div>
)

StepLayout.defaultProps = {
  nextLabel: 'Continue',
  nextButtonProps: { width: 160 },
  backLabel: 'Back',
  backButtonProps: {},
  centered: false,
}

export default injectStyles(styles)(resetScrollPositionOnMount(StepLayout))
