import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import { format } from 'date-fns'
import InfoIcon from 'material-ui-icons/InfoOutline'
import CurrencyDelta from 'components/CurrencyDelta'

import styles from './Card.jss'

const CardHeader = ({ classes, dateTime, delta }) => (
  <div className={classes.header}>
    <div className={classes.headerDateTime}>
      {format(dateTime, 'MMMM d, h:mmaa')}
    </div>
    <div className={classes.headerInfo}>
      <CurrencyDelta value={delta} />
      <InfoIcon className={classes.headerInfoIcon} />
    </div>
  </div>
)

export default injectStyles(styles)(CardHeader)
