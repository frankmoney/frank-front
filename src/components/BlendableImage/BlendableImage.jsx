import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {},
}

// const histogram = blob => {
//   console.log(blob)
// }

// const handleLoad = e => {
// const image = e.currentTarget

// Vibrant.from(image.src).getPalette().then(palette => console.log(palette))

// // image.crossOrigin = 'Anonymous'
// const canvas = document.createElement('canvas')
// canvas.width = image.width
// canvas.height = image.height
// const context = canvas.getContext('2d')
// context.drawImage(image, 0, 0, image.width, image.height)
// canvas.toBlob(histogram)
// const pixelData = context.getImageData(3, 3, 1, 1).data
// }

const mainColor = R.pipe(
  R.values,
  R.reject(R.isNil),
  R.sortBy(R.prop('_population')),
  R.reverse,
  R.head,
  R.prop('_rgb'),
  R.map(x => x.toString(16)),
  R.prepend('#'),
  R.join('')
)

class Image extends React.PureComponent {
  state = {
    color: null,
  }

  componentDidMount() {
    const { src } = this.props
    console.log('src', src)
    if (!src) {
      return
    }
    const params = new URLSearchParams()
    params.append('url', src)
    fetch(`/utils/palette?${params.toString()}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const color = mainColor(data)
        this.setState({ color })
      })
  }

  render() {
    const { classes, className, src, ...props } = this.props
    const { color } = this.state
    return (
      <div
        className={cx(classes.root, className)}
        style={{ backgroundColor: color }}
      >
        <img
          src={src}
          alt="TODO"
          className={classes.image}
          {...props}
          // onLoad={handleLoad}
        />
      </div>
    )
  }
}

export default injectStyles(styles)(Image)
