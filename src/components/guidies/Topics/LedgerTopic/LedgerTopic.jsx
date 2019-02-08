import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import TopicText from '../TopicText'
import imgUrl from './topic_ledger.png'

const styles = {
  root: {},
  image: {
    width: '100%',
    objectFit: 'contain',
    position: 'relative',
    top: -10,
  },
}

const LedgerTopic = ({ classes, className }) => (
  <div className={cx(classes.root, className)}>
    <TopicText>
      Browse your payments, view charts,<br />
      edit payments individually or in bulk.
    </TopicText>
    <img className={classes.image} src={imgUrl} alt="ledger" />
    <TopicText>
      Preview how your account looks <br />
      to the general public.
    </TopicText>
  </div>
)

export default injectStyles(styles)(LedgerTopic)
