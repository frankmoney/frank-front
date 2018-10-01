import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import colors from 'styles/colors'
import ChartIcon from '../Chart.svg'
import CloseIcon from './Close.svg'

const styles = theme => ({
  root: {
    alignItems: 'center',
    background: colors.black,
    borderRadius: [0, 0, 8, 8],
    bottom: -1,
    display: 'flex',
    height: 60,
    left: 0,
    padding: [10, 20, 10],
    position: 'absolute',
    width: '100%',
  },
  collapsed: {
    borderRadius: 8,
    cursor: 'pointer',
    position: 'relative',
    width: 'auto',
    paddingRight: 24,
  },
  chartIcon: {
    color: '#FFFFFF',
    marginRight: 19,
  },
  title: {
    ...theme.fontMedium(16, 20),
    color: '#FFFFFF',
    position: 'relative',
    top: 1,
    '$button &': {
      top: 0,
    },
  },
  subtitle: {
    ...theme.fontRegular(14, 20),
    color: '#9295A1',
  },
  frank: {
    fontWeight: 500,
  },
  closeIcon: {
    color: '#666B7B',
    position: 'absolute',
    right: 20,
    cursor: 'pointer',
  },
})

const Expander = ({
  classes,
  className,
  closed,
  onClick,
  onClose,
  subtitle,
  title,
}) => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <div
    className={cx(classes.root, { [classes.collapsed]: closed }, className)}
    onClick={onClick}
  >
    <ChartIcon className={classes.chartIcon} />
    <div>
      <div className={classes.title}>{title || 'Real-time report'}</div>
      <div className={classes.subtitle}>
        {subtitle || (
          <>
            Verified by <span className={classes.frank}>Frank</span>
          </>
        )}
      </div>
    </div>
    {!!onClose && <CloseIcon className={classes.closeIcon} onClick={onClose} />}
  </div>
)

Expander.propTypes = {
  closed: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string,
}

export default injectStyles(styles)(Expander)
