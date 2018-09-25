import React from 'react'
import { Draggable } from '@frankmoney/components'

const getImageCoverPosition = (image, viewport) => {
  const ri = image.width / image.height
  const rv = viewport.width / viewport.height
  const isWidthOriented = ri >= rv

  if (isWidthOriented) {
    const width = viewport.height * ri
    const height = viewport.height
    return {
      width,
      height,
    }
  }

  const height = viewport.width / ri
  const width = viewport.width
  return {
    width,
    height,
  }
}

class ImageMiniature extends React.Component {
  static defaultProps = {
    onCrop: () => {},
  }

  state = {
    imageSize: null,
    offset: { x: 0, y: 0 },
    measured: false,
  }

  handleContainerRef = el => {
    this._container = el
  }

  handleImageLoad = event => {
    if (!this.state.measured) {
      const containerSize = {
        width: this._container.offsetWidth,
        height: this._container.offsetHeight,
      }
      const originImageSize = {
        width: event.target.width,
        height: event.target.height,
      }
      const imageSize = getImageCoverPosition(originImageSize, containerSize)

      const left = this.props.initialCrop
        ? this.props.initialCrop.left * imageSize.width
        : (imageSize.width - containerSize.width) / 2
      const top = this.props.initialCrop
        ? this.props.initialCrop.top * imageSize.height
        : (imageSize.height - containerSize.height) / 2

      this.setState(
        {
          measured: true,
          containerSize,
          originImageSize,
          imageSize,
          offset: { x: -left, y: -top },
        },
        () => {
          this.props.onCrop({
            left: Math.abs(this.state.offset.x / imageSize.width),
            top: Math.abs(this.state.offset.y / imageSize.height),
            width: containerSize.width / imageSize.width,
            height: containerSize.height / imageSize.height,
          })
        }
      )
    }
  }

  handleDragChange = ({ type, offsetX, offsetY }) => {
    if (type === Draggable.changesType.move) {
      this.setState({ offset: { x: offsetX, y: offsetY } })
    } else if (type === Draggable.changesType.end) {
      const { offset, imageSize, containerSize } = this.state

      this.props.onCrop({
        left: Math.abs(offset.x / imageSize.width),
        top: Math.abs(offset.y / imageSize.height),
        width: containerSize.width / imageSize.width,
        height: containerSize.height / imageSize.height,
      })
    }
  }

  render() {
    const { className, imageClassName, imageSrc } = this.props
    const { measured, imageSize } = this.state
    return (
      <Draggable
        offsetX={this.state.offset.x}
        offsetY={this.state.offset.y}
        onDragChange={this.handleDragChange}
      >
        {({ getHandleProps, getContainerProps }) => (
          <div
            {...getContainerProps({ className, ref: this.handleContainerRef })}
          >
            <img
              src={imageSrc}
              alt=""
              onLoad={this.handleImageLoad}
              {...getHandleProps({
                className: imageClassName,
                style: measured
                  ? {
                      width: `${imageSize.width}px`,
                      height: `${imageSize.height}px`,
                    }
                  : {},
              })}
            />
          </div>
        )}
      </Draggable>
    )
  }
}

export default ImageMiniature
