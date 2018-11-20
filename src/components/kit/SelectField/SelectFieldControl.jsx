import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { ArrowDropDown } from 'material-ui-icons'
import Placeholder from 'components/kit/fields/Placeholder'

const styles = {
  root: {
    color: '#20284A',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    outline: 'none',
  },
  value: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    flexGrow: 1,
  },
  arrow: {
    marginLeft: 5,
    color: 'rgba(37, 43, 67, 0.2)',
    flexShrink: 0,
  },
  placeholder: {
    flexGrow: 1,
  },
  active: {
    '&:not($disableArrowHover) $arrow': {
      color: '#4C51F3',
    },
  },
  stretch: {
    width: '100%',
  },
  disableArrowHover: {},
}

class SelectFieldControl extends React.Component {
  render() {
    const {
      classes,
      className,
      theme,
      value,
      controlRef,
      active,
      stretch,
      disableArrowHover,
      placeholder,
      ...otherProps
    } = this.props

    return (
      <div
        ref={controlRef}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        className={cx(
          classes.root,
          {
            [classes.stretch]: stretch,
            [classes.active]: active,
            [classes.disableArrowHover]: disableArrowHover,
          },
          className
        )}
        {...otherProps}
      >
        <div className={classes.value}>
          {value || (placeholder && <Placeholder>{placeholder}</Placeholder>)}
        </div>
        <ArrowDropDown className={classes.arrow} />
      </div>
    )
  }
}

export default injectStyles(styles)(SelectFieldControl)
