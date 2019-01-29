// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { TableCell, TableRow } from '@frankmoney/components'
import { injectStyles } from 'utils/styles'
import CurrencyDelta from 'components/CurrencyDelta'
import CategoryLabel from 'components/CategoryLabel'
import HighlightText from 'components/HighlightText'
import { formatShortDate } from 'utils/dates'
import Checkbox from 'components/kit/Checkbox'
import PaymentStatus from 'components/admin/PaymentStatus'
import styles from './PaymentsTableRow.jss'

const renderCheckbox = ({ getProps, checked, disabled, checkRow }) => (
  <Checkbox
    hitzoneLeftCompensation
    checked={checked}
    disabled={disabled}
    onChange={value => checkRow(value)}
    {...getProps()}
  />
)

const PaymentsTableRow = ({
  classes,
  className,
  data: { verified, description, peer, amount, category, postedOn, pending },
  canEdit,
  ...rowProps
}) => (
  <TableRow
    className={cx(
      classes.root,
      {
        [classes.unverified]: !verified,
        [classes.editable]: canEdit,
      },
      className
    )}
    checkboxClassName={classes.checkbox}
    renderCheckbox={renderCheckbox}
    hoverBackgroundColor="#f6f7f7"
    disableCheckbox={pending}
    {...rowProps}
  >
    <TableCell name="description" className={classes.cellLeft}>
      <div
        className={cx(classes.description, {
          [classes.emptyDescription]: !pending && !description,
          [classes.pendingDescription]: !!pending,
        })}
      >
        {pending ? (
          'Pending'
        ) : description ? (
          <HighlightText text={description} />
        ) : canEdit ? (
          'Add description...'
        ) : (
          'No description'
        )}
      </div>
      <div className={classes.info}>
        {peer && (
          <div className={classes.client}>
            {' '}
            <HighlightText text={peer.name} />
          </div>
        )}
        {category && (
          <CategoryLabel
            className={classes.category}
            iconClassName={classes.categoryIcon}
            color={category.color}
            name={category.name}
          />
        )}
      </div>
    </TableCell>
    <TableCell name="sum" className={classes.cellRight}>
      <CurrencyDelta className={classes.sum} value={amount} faint={pending} />
      <div className={classes.icons}>
        <div className={classes.date}>{formatShortDate(postedOn)}</div>
        {canEdit && (
          <PaymentStatus
            className={classes.status}
            verified={verified}
            pending={pending}
          />
        )}
      </div>
    </TableCell>
  </TableRow>
)

export default injectStyles(styles)(PaymentsTableRow)
