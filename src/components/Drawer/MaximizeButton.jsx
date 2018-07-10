import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import { compose, mapProps } from 'recompose'
import MaximizeIcon from './MaximizeIcon.svg'

const styles = {
  root: {
    marginLeft: 5,
    cursor: 'pointer',
    color: '#D8D8D8',
    stroke: '#D8D8D8',
    fill: '#D8D8D8',
    '&:hover': {
      stroke: '#000',
      fill: '#000',
    },
  },
}

export default compose(
  injectStyles(styles),
  mapProps(({ classes, className, ...otherProps }) => ({
    ...otherProps,
    className: cx(className, classes.root),
  }))
)(MaximizeIcon)
