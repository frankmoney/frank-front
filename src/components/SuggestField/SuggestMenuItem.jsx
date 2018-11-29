// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: '#20284A',
    padding: [0, 15],
    height: 50,
    cursor: 'pointer',
    transition: theme.transition('background-color'),
  },
  label: {
    flex: 1,
    ...theme.fontRegular(18, 26),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  secondaryText: {
    color: 'rgba(32, 40, 74, 0.3)',
    flexShrink: 0,
    marginLeft: 15,
  },
  active: {
    backgroundColor: 'rgba(37, 43, 67, 0.04)',
  },
  faint: {
    '& $label': {
      color: 'rgba(32, 40, 74, 0.3)',
    },
  },
})

type Props = {|
  ...InjectStylesProps,
  active: boolean,
  faint?: boolean,
  secondaryText: string,
  text: string,
|}

const SuggestMenuItem = ({
  active,
  classes,
  faint,
  secondaryText,
  text,
}: Props) => (
  <div
    className={cx(classes.root, {
      [classes.active]: active,
      [classes.faint]: faint,
    })}
  >
    <div className={classes.label}>{text}</div>
    {secondaryText && (
      <div className={classes.secondaryText}>{secondaryText}</div>
    )}
  </div>
)

SuggestMenuItem.defaultProps = {
  active: false,
  faint: false,
}

export default injectStyles(styles)(SuggestMenuItem)
