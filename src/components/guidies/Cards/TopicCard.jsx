import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import Paper from 'components/kit/Paper'
import CloseIcon from 'components/icons/CloseIcon.svg'

const styles = theme => ({
  root: {
    padding: 40,
    position: 'relative',
    marginBottom: 35,
  },
  title: {
    color: '#252B43',
    ...theme.fontMedium(28, 46),
    marginBottom: 40,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 40,
    color: '#D8D8D8',
    cursor: 'pointer',
    transition: theme.transition('color'),
    '&:hover': {
      color: '#252B43',
    },
  },
})

const TopicText = ({
  classes,
  className,
  title = 'How it works',
  children,
  onClose,
}) => (
  <Paper type="card" className={cx(classes.root, className)}>
    <CloseIcon className={classes.closeButton} onClick={() => onClose()} />
    <div className={classes.title}>{title}</div>
    {children}
  </Paper>
)

export default injectStyles(styles)(TopicText)
