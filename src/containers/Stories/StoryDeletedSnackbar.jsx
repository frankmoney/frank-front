import React from 'react'
import { connect } from 'react-redux'
import { compose, withProps, withState, withHandlers } from 'recompose'
import { SnackBar, SnackBarButton } from '@frankmoney/components'
import { storyDeletedSnackBarIsOpenSelector } from './selectors'

export default compose(
  connect(() => state => ({
    shown: storyDeletedSnackBarIsOpenSelector(state),
  })),
  withState('shown', 'toggleBar', ({ shown }) => shown),
  withHandlers({
    onDismiss: ({ toggleBar }) => () => {
      toggleBar(false)
    },
  }),
  withProps(({ onDismiss }) => ({
    dismissOnTimeout: 10000,
    message: <span>The story was deleted.</span>,
    theme: 'grey',
    buttons: [<SnackBarButton onClick={onDismiss} label="Close" />],
  }))
)(SnackBar)
