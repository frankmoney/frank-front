// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import { withProps } from 'recompose'
import Button from 'components/kit/Button'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import FrankLogo from 'components/AdminLayout/FrankLogo.svg'
import ErrorImage from './error_image.jpg'

const styles = theme => ({
  root: {
    color: '#252B43',
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  logo: {
    position: 'absolute',
    top: 36,
    left: 40,
    width: 100,
    height: 32,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 261,
  },
  text: {
    ...theme.fontSemibold(40, 48),
    marginTop: 27,
    textAlign: 'center',
  },
  button: {
    marginTop: 26,
  },
  mobile: {
    '& $logo': {
      color: '#D3D5D9',
      height: 18,
      left: 'unset',
      right: 20,
      top: 23,
      width: 60,
    },
    '& $text': {
      ...theme.fontSemibold(22, 28),
      marginTop: 49,
    },
  },
})

type Props = {|
  ...InjectStylesProps,
  //
  mobile?: boolean,
  text: React.Node,
|}

let ErrorPage = ({ classes, className, text, mobile }: Props) => (
  <div className={cx(classes.root, { [classes.mobile]: mobile }, className)}>
    <FrankLogo className={classes.logo} />
    <div className={classes.wrapper}>
      <img src={ErrorImage} className={classes.image} alt="" />
      <div className={classes.text}>{text}</div>
      <Button
        className={classes.button}
        href="/"
        label="Take me back home"
        larger
      />
    </div>
  </div>
)
ErrorPage = injectStyles(styles)(ErrorPage)

export const NotFound = withProps({
  text: (
    <>
      The information<br />
      you were looking for isn't there
    </>
  ),
})(ErrorPage)

export const ExceptionPage = withProps({
  text: (
    <>
      Sorry, not sure<br />
      what just happened
    </>
  ),
})(ErrorPage)
