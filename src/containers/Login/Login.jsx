import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import { Button } from '@frankmoney/components'
import TextBox from 'components/TextBox'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
  },
  container: {
    width: 500,
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    ...theme.fontRegular(36),
    flexShrink: 0,
    marginRight: 30,
  },
  email: {
    ...theme.fontRegular(32),
    position: 'relative',
    top: 9,
  },
  submit: {
    width: '100%',
    fontSize: 24,
    height: 50,
  },
  problemsWrap: {
    marginTop: 15,
  },
  problemsLabel: {
    float: 'right',
    color: '#484DE7',
    cursor: 'pointer',
    ...theme.fontRegular(18, 24),
    opacity: '0.7',
    '&:hover': {
      opacity: 1,
    },
  },
})

const ls = typeof window === 'undefined' ? null : window.localStorage

const Login = ({
  classes,
  email,
  setEmail,
  hasProblem,
  handleProblem,
  handleSubmit,
}) => (
  <div className={classes.root}>
    <div className={classes.container}>
      <div className={classes.form}>
        <div className={classes.title}>I am, </div>
        <TextBox
          value={email}
          onChange={event => setEmail(event.target.value)}
          className={classes.email}
          placeholder={hasProblem ? 'name@frank.ly' : 'gay@frank.ly'}
          onKeyPress={event => event.key === 'Enter' && handleSubmit()}
        />
      </div>
      <Button
        className={classes.submit}
        fat
        type="primary"
        label={hasProblem ? 'Let me in' : 'DEEP LOGIN'}
        onClick={handleSubmit}
        disabled={!email}
      />
      {!hasProblem && (
        <div className={classes.problemsWrap}>
          <div className={classes.problemsLabel} onClick={handleProblem}>
            Not a gay?
          </div>
        </div>
      )}
    </div>
  </div>
)

export default compose(
  injectStyles(styles),
  withState('hasProblem', 'setProblem', () => ls.getItem('gay_problems')),
  withState('email', 'setEmail', ''),
  withHandlers({
    handleSubmit: props => () => {
      window.location = `${window.location.origin}/login?user=${props.email}`
    },
    handleProblem: props => () => {
      props.setProblem(true)
      ls.setItem('gay_problems', true)
    },
  })
)(Login)