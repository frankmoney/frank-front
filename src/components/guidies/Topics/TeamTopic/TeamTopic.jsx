import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import TopicText from '../TopicText'
import imgUrl from './topic_team.png'

const styles = {
  root: {},
  image: {
    position: 'relative',
    width: '100%',
    objectFit: 'contain',
    left: -9,
    marginTop: 35,
  },
}

const TeamTopic = ({ classes, className }) => (
  <div className={cx(classes.root, className)}>
    <TopicText>
      Invite your team members and assign roles to work together faster <br />{' '}
      and avoid bottlenecks in your workflow.
    </TopicText>
    <img className={classes.image} src={imgUrl} alt="team" />
  </div>
)

export default injectStyles(styles)(TeamTopic)
