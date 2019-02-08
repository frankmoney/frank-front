// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { ArrowDropDown } from 'material-ui-icons'
import Placeholder from 'components/kit/fields/Placeholder'
import { injectStyles } from 'utils/styles'

const styles = {
  root: {
    color: '#20284A',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    outline: 'none',
    userSelect: 'none',
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
  arrowUp: {
    '& $arrow': {
      transform: 'rotate(180deg)',
    },
  },
}

type Props = {}

class SelectFieldControl extends React.Component<Props> {
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
      arrowUp,
      placeholder,
      renderPlaceholder,
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
            [classes.arrowUp]: arrowUp,
          },
          className
        )}
        {...otherProps}
      >
        <div className={classes.value}>
          {value ||
            (placeholder && <Placeholder>{placeholder}</Placeholder>) ||
            (typeof renderPlaceholder === 'function' && renderPlaceholder({active}))}
        </div>
        <ArrowDropDown className={classes.arrow} />
      </div>
    )
  }
}

export default injectStyles(styles)(SelectFieldControl)
