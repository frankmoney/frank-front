import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import TopicText from '../TopicText'
import imgUrl from './topic_new.png'

const styles = {
  root: {},
  image: {
    width: '100%',
    marginTop: 35,
    marginBottom: 50,
    position: 'relative',
    left: -2,
    objectFit: 'contain',
  },
}

const NewTopic = ({ classes, className }) => (
  <div className={cx(classes.root, className)}>
    <TopicText>
      Each payment from a connected bank account is visible on Frank <br />
      and appears daily. However, true transparency isn’t just visible data:<br />
      it’s data that is understandable. <br />
      <br />
      To help, we make it simple to:
    </TopicText>
    <img className={classes.image} src={imgUrl} alt="cards" />
    <TopicText>
      Focus on your mission, not bookkeeping. Have recurring payments? Skip
      <br />
      filling in the same data every time. With our suite of automations, these
      <br />
      payments are sent straight to your Ledger.
    </TopicText>
  </div>
)

export default injectStyles(styles)(NewTopic)
