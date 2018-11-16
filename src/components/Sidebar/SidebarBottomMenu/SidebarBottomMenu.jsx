import React from 'react'
import cx from 'classnames'
import { compose, withProps, withState, withHandlers } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import { ArrowDropDown as ArrowIcon } from 'material-ui-icons'
import styles from './SidebarBottomMenu.jss'

const SidebarBottomMenu = ({
  className,
  classes,
  children,
  // handlers
  handleToggleButtonClick,
  theme,
}) => (
  <div className={cx(classes.bottomMenu, className)}>
    {React.Children.count(children) > 1 && (
      <ArrowIcon className={classes.bottomMenuIcon} />
    )}
    <div className={classes.bottomMenuWrap}>
      {React.Children.map(children, (item, idx) =>
        React.cloneElement(
          item,
          idx === 0 ? { onClick: handleToggleButtonClick, theme } : { theme }
        )
      )}
    </div>
  </div>
)

export default compose(
  withState('isOpened', 'setIsOpened', false),
  withProps(props => ({
    itemsCount: React.Children.count(props.children),
  })),
  withHandlers({
    handleToggleButtonClick: props => () => {
      const firstChild = React.Children.toArray(props.children)[0]
      if (firstChild.props.onClick) {
        firstChild.props.onClick()
      }

      props.setIsOpened(!props.isOpened)
    },
  }),
  injectStyles(styles)
)(SidebarBottomMenu)
