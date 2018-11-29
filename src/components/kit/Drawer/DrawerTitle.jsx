// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import Clamp from 'shiitake'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import DrawerHeaderButton from './DrawerHeadButton'

const styles = {
  root: {
    color: '#252B43',
    padding: [27, 30],
  },
  smaller: {
    padding: [33, 30],
    '& $text': {
      fontSize: 26,
      lineHeight: 34,
    },
    '& $buttons': {
      marginTop: 7,
    },
  },
  text: {
    fontSize: 40,
    lineHeight: 46,
    fontWeight: 500,
  },
  buttons: {
    flexShrink: 0,
    marginLeft: 20,
    float: 'right',
    marginTop: 13,
    '& > *:not(:last-child)': {
      marginRight: 20,
    },
  },
}

type Props = {|
  ...InjectStylesProps,
  //
  clamp: number,
  smaller?: boolean,
  children: React.Node,
  buttons: React.ChildrenArray<React.Element<typeof DrawerHeaderButton>>,
|}

const DrawerTitle = ({
  classes,
  className,
  clamp = 1,
  smaller,
  children,
  buttons,
  ...otherProps
}: Props) => (
  <div
    className={cx(
      classes.root,
      {
        [classes.smaller]: smaller,
      },
      className
    )}
  >
    {buttons && (
      <div className={classes.buttons}>
        {React.Children.map(buttons, (child, idx) =>
          React.cloneElement(child, { key: idx })
        )}
      </div>
    )}
    <Clamp className={classes.text} lines={clamp} {...otherProps}>
      {children}
    </Clamp>
  </div>
)

export default injectStyles(styles)(DrawerTitle)
