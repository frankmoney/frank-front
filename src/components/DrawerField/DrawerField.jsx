import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import { compose, mapProps } from 'recompose'
import Field from 'components/Field'
import FieldLabel from 'components/FieldLabel'

const styles = theme => ({
  field: {
    display: 'flex',
    marginBottom: 30,
  },
  label: {
    width: 200,
    minWidth: 200,
    marginBottom: 0,
  },
  labelTitle: {
    position: 'relative',
    color: '#252b43',
    ...theme.fontMedium(18, 26),
  },
  control: {
    flex: 1,
    marginLeft: 5,
  },
})

export default compose(
  injectStyles(styles),
  mapProps(({ theme, classes, title, children, ...otherProps }) => ({
    className: classes.field,
    label: (
      <FieldLabel
        className={classes.label}
        titleClassName={classes.labelTitle}
        title={title}
      />
    ),
    children: <div className={classes.control}>{children}</div>,
    ...otherProps,
  }))
)(Field)
