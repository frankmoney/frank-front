import React, { Fragment } from 'react'
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
const AccountsField = ({ classes, accounts, selection, onChange }) => (
  <Field title="Access">
    {accounts &&
      accounts.map(({ id, name }, index) => (
        <Fragment key={id}>
          {index > 0 && <hr className={classes.separator} />}
          <label className={classes.item}>
            <Checkbox
              className={classes.checkBox}
              value={id}
              checked={selection.indexOf(id) >= 0}
              onChange={onChange}
            />
            <span className={classes.label}>{name}</span>
          </label>
        </Fragment>
      ))}
  </Field>
)
/* eslint-enable jsx-a11y/label-has-for */

export default injectStyles(styles)(AccountsField)
