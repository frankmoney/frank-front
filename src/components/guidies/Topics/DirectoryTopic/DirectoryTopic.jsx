import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import TopicText from '../TopicText'
import imgUrl from './topic_directory.png'

const styles = {
  root: {},
  image: {
    width: '100%',
    objectFit: 'contain',
    marginTop: 15,
    position: 'relative',
    left: -10,
  },
}

const DirectoryTopic = ({ classes, className }) => (
  <div className={cx(classes.root, className)}>
    <TopicText>
      Directory lists the people and companies <br />
      financially involved with your project.
    </TopicText>
    <img className={classes.image} src={imgUrl} alt="directory" />
  </div>
)

export default injectStyles(styles)(DirectoryTopic)
