// @flow strict-local
import React from 'react'
import { compose, withState } from 'recompose'
import { IconButton } from 'components/kit/Button'
import { injectStyles } from 'utils/styles'
import HideFooter from './HideFooter.svg'

const styles = theme => ({
  root: {
    display: ({ hidden }) => (hidden ? 'none' : 'flex'),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    height: 90,
    opacity: 0.9,
    backgroundColor: '#252b43',
    boxShadow: '0px -1px 0px rgba(37, 43, 67, 0.08)',
    color: '#fff',
    ...theme.fontRegular(20),
  },
  hide: {
    position: 'absolute',
    right: 35,
    width: 20,
    height: 20,
  },
})

const Footer = ({ classes, setHidden }) => (
  <div className={classes.root}>
    If your team is already on Frank, contact your Team Administrator for an
    invitation
    <IconButton
      className={classes.hide}
      icon={<HideFooter />}
      onClick={() => setHidden(true)}
    />
  </div>
)

export default compose(
  withState('hidden', 'setHidden'),
  injectStyles(styles)
)(Footer)
