// @flow
import React from 'react'
import throttle from 'lodash/throttle'
import EventListener from 'react-event-listener'
import GeneralErrorSnack from './GeneralErrorSnack'

type Props = {
  renderErrorSnack: Func,
  supportEmail: string,
}

const renderGeneralErrorSnack = (error, props) => (
  <GeneralErrorSnack {...props} />
)

class UnexpectedErrorManager extends React.Component<Props> {
  static defaultProps = {
    renderErrorSnack: renderGeneralErrorSnack,
    supportEmail: 'support@frank.ly',
  }

  state = {
    errors: [],
  }

  handleError = throttle(
    err => {
      this.setState(state => ({ errors: [...state.errors, err] }))
    },
    1000,
    { leading: true, trailing: false }
  )

  handleDismissError = err => {
    if (this.state.errors.includes(err)) {
      this.setState(state => ({ errors: state.errors.filter(e => e !== err) }))
    }
  }

  render() {
    return (
      <EventListener target="window" onError={this.handleError}>
        {this.state.errors.map(err =>
          this.props.renderErrorSnack(err, {
            shown: true,
            onDismiss: this.handleDismissError,
            supportEmail: this.props.supportEmail,
          })
        )}
      </EventListener>
    )
  }
}

export default UnexpectedErrorManager
