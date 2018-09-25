import React from 'react'

export default class DefaultImage extends React.Component {
  handleError = event => {
    // eslint-disable-next-line no-param-reassign
    event.currentTarget.src = this.props.defaultSrc
  }
  render() {
    const { defaultSrc, ...props } = this.props
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} onError={this.handleError} />
  }
}
