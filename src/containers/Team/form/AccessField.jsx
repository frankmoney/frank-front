import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import { Checkbox } from 'material-ui'
import Field from './Field'

const styles = theme => ({
  separator: {
    margin: 0,
    borderTop: 0,
    borderRight: 0,
    borderLeft: 0,
    borderBottom: '1px solid rgba(32, 40, 74, 0.12)',
  },
  item: {
    display: 'block',
  },
  checkBox: {
    color: ['#484de7', '!important'],
  },
  label: {
    marginLeft: 14,
    ...theme.fontRegular(18, 60),
  },
})

/* eslint-disable jsx-a11y/label-has-for */
const AccessField = ({ classes, items, access }) => (
  <Field title="Access">
    {items &&
      items.map(({ id, name }, index) => (
        <>
          {index > 0 && <hr className={classes.separator} />}
          <label className={classes.item}>
            <Checkbox className={classes.checkBox} checked={!!access[id]} />
            <span className={classes.label}>{name}</span>
          </label>
        </>
      ))}
  </Field>
)
/* eslint-enable jsx-a11y/label-has-for */

export default injectStyles(styles)(AccessField)
