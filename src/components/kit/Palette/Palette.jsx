import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  sampleGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  sample: {
    outline: 'none',
  },
  sampleSelected: {
    border: '1px solid white',
  },
}

const getPaletteIndex = (color, palette) => {
  for (let colorIndex = 0; colorIndex < palette.length; colorIndex += 1) {
    const tones = palette[colorIndex]
    for (let toneIndex = 0; toneIndex < tones.length; toneIndex += 1) {
      if (tones[toneIndex] === color) {
        return [colorIndex, toneIndex]
      }
    }
  }
}

const getPaletteNearbyColor = (direction, color, palette) => {
  const [colorIdx, toneIdx] = getPaletteIndex(color, palette)
  if (direction === 'up') {
    // move to upper tone
    const tones = palette[colorIdx]
    return tones[toneIdx - 1] || tones[toneIdx]
  } else if (direction === 'down') {
    // move to lower tone
    const tones = palette[colorIdx]
    return tones[toneIdx + 1] || tones[toneIdx]
  } else if (direction === 'left') {
    // move to the left color
    const tones = palette[colorIdx - 1] || palette[colorIdx]
    return tones[toneIdx]
  } else if (direction === 'right') {
    // move to the right color
    const tones = palette[colorIdx + 1] || palette[colorIdx]
    return tones[toneIdx]
  }
}

class Palette extends React.Component {
  static defaultProps = {
    palette: [],
    sampleWidth: 82,
    sampleHeight: 42,
  }

  state = {
    value: this.props.defaultValue,
  }

  get isControlled() {
    return typeof this.props.value !== 'undefined'
  }

  getState(state = this.state) {
    return {
      value: this.isControlled ? this.props.value : state.value,
    }
  }

  setValue(color) {
    if (this.isControlled) {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(color)
      }
    } else if (this.state.value !== color) {
      this.setState({ value: color }, () => {
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(color)
        }
      })
    }
  }

  handleClickColor = event => {
    const color = event.target.dataset.color
    this.setValue(color)
  }

  handleKeyDown = event => {
    const key = event.key
    if (key.startsWith('Arrow')) {
      const direction = key.replace('Arrow', '').toLowerCase()
      const { value } = this.getState()
      const { palette } = this.props
      if (!value) {
        this.setValue(palette[0][0])
      } else {
        this.setValue(getPaletteNearbyColor(direction, value, palette))
      }
    }
  }

  render() {
    const {
      classes,
      className,
      palette,
      sampleWidth,
      sampleHeight,
      value: valueProp,
      onChange,
      ...otherProps
    } = this.props

    // TODO proper focus control (use input type=radio?)

    const { value } = this.getState(this.state)

    return (
      <div
        className={cx(classes.root, className)}
        tabIndex={0}
        onKeyDown={this.handleKeyDown}
        {...otherProps}
      >
        {palette.map(colorGroup => (
          <div className={classes.sampleGroup}>
            {colorGroup.map(color => (
              <div
                className={cx(classes.sample, {
                  [classes.sampleSelected]: value === color,
                })}
                style={{
                  width: sampleWidth,
                  height: sampleHeight,
                  background: color,
                }}
                data-color={color}
                onClick={this.handleClickColor}
              />
            ))}
          </div>
        ))}
      </div>
    )
  }
}

export default injectStyles(styles)(Palette)
