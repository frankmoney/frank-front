import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import StepLayout from '../../StepLayout'
import imageUrl from './api_image.png'

const styles = theme => ({
  root: {},
  image: {
    width: 228,
  },
  title: {
    color: '#252B43',
    ...theme.fontSemibold(40, 46),
    marginTop: 40,
    textAlign: 'center',
  },
  text: {
    color: '#F54444',
    ...theme.fontRegular(22, 30),
    marginTop: 20,
  },
})

const AcceptExternalAPIUsage = ({ className, classes, onAccept, ...props }) => (
  <StepLayout
    canGoNext
    centered
    onNext={onAccept}
    className={cx(classes.root, className)}
    {...props}
  >
    <img src={imageUrl} alt="api_image" className={classes.image} />
    <div className={classes.title}>
      Frank uses MX Atrium API
      <br />
      to connect your bank account
    </div>
    <div className={classes.text}>We never store account credentials</div>
  </StepLayout>
)

export default injectStyles(styles)(AcceptExternalAPIUsage)
