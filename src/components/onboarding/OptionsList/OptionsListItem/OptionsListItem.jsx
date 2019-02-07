import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import CleanLink from '../../../kit/CleanLink'
import PrimaryText from './PrimaryText'
import Context from './context'

const styles = theme => ({
  root: {
    display: 'block', // override if root component set to 'a' for example
    borderRadius: 8,
    padding: [12, 15],
    background: 'rgba(32, 40, 74, 0.04)',
    transition: theme.transition('background-color'),
    cursor: 'pointer',
    color: '#20284A',
    userSelect: 'none',
    '&:hover:not($selected)': {
      background: 'rgba(32, 40, 74, 0.1)',
    },
  },
  selected: {
    cursor: 'unset',
    background: '#20284A',
    boxShadow: '0px 2px 10px rgba(47, 60, 113, 0.25)',
  },
})

const OptionsListItem = ({
  classes,
  selected,
  className,
  children,
  primaryText,
  primaryTextIcon,
  ...otherProps
}) => {
  const cls = cx(classes.root, selected && classes.selected, className)
  const content = (
    <Context.Provider value={{ selected }}>
      {primaryText && (
        <PrimaryText icon={primaryTextIcon}>{primaryText}</PrimaryText>
      )}
      {children}
    </Context.Provider>
  )

  if (otherProps.href) {
    const { externalLink, ...linkProps } = otherProps

    return (
      <CleanLink className={cls} external={externalLink} {...linkProps}>
        {content}
      </CleanLink>
    )
  }

  return (
    <div className={cls} {...otherProps}>
      {content}
    </div>
  )
}

export default injectStyles(styles)(OptionsListItem)
