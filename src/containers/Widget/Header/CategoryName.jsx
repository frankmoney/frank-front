import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { ArrowBack as IconArrowBack } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'

const styles = theme => ({
  root: {
    cursor: 'pointer',
    display: 'flex',
    outline: 'none',
    padding: [18, 0, 0],
  },
  title: {
    ...theme.fontRegular(20, 26),
    color: '#252B43',
    marginLeft: 9,
  },
  icon: {
    color: '#A8AAB4',
    margin: [1, 0, 0, -4],
  },
})

const CategoryName = ({ classes, className, name, onClick }) => (
  <div
    className={cx(classes.root, className)}
    onClick={onClick}
    role="button"
    tabIndex={0}
  >
    <IconArrowBack className={classes.icon} />
    <div className={classes.title}>{name}</div>
  </div>
)

CategoryName.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
}

export default injectStyles(styles)(CategoryName)
