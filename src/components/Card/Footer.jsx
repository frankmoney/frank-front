import React from 'react'
import { Switch } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import { compose, withState } from 'recompose'
import DiscussButton from './DiscussButton'
import DoneButton from './DoneButton'
import MoreButton from './MoreButton'
import styles from './Card.jss'

const CardFooter = ({ classes, auto, setAuto }) => (
  <div className={classes.footer}>
    <div className={classes.footerToggleWrap}>
      <div>
        <Switch
          className={classes.footerToggleSwitch}
          color="#21CB61"
          checked={auto}
          onChange={(event, checked) => setAuto(checked)}
        />
      </div>
      <div className={classes.footerToggleHint}>
        Add same recipient, category and description for similar payments
        automatically
      </div>
    </div>
    <div className={classes.footerButtons}>
      <MoreButton />
      <DiscussButton />
      <DoneButton />
    </div>
  </div>
)

export default compose(
  withState('auto', 'setAuto', ({ auto }) => auto),
  injectStyles(styles)
)(CardFooter)
