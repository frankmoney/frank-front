import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import CheckCircle from 'material-ui-icons/CheckCircle'
import CategoryLabel from 'components/CategoryLabel'
import styles from './Card.jss'

const CardBody = ({ classes, categoryColor, categoryName }) => (
  <div className={classes.body}>
    <div className={classes.bodyRecipientWrap}>
      <div className={classes.fieldHint}>
        <strong>Recipient</strong>
        Had been reviewed previously
      </div>
      <div className={classes.field}>
        <CheckCircle className={classes.bodyRecipientCheckIcon} />
        Readymag
      </div>
    </div>
    <div className={classes.bodyCategoryWrap}>
      <div className={classes.fieldHint}>
        <strong>Category</strong>
        Added from similar payment
      </div>
      <div className={classes.field}>
        <CategoryLabel
          size={16}
          color={categoryColor || 'rgba(37, 43, 67, 0.2)'}
          name={categoryName || 'Uncategorized'}
        />
      </div>
    </div>
    <div className={classes.bodyDescriptionWrap}>
      <div className={classes.fieldHint}>
        <strong>Description</strong>
        Added from similar payment
      </div>
      <div className={classes.field}>
        Digital advertising campaign investments
      </div>
    </div>
  </div>
)

export default injectStyles(styles)(CardBody)
