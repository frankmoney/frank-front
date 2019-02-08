import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import TopicText from '../TopicText'
import imgUrl from './topic_stories.png'

const styles = {
  root: {},
  image: {
    width: '100%',
    marginTop: 45,
    position: 'relative',
    left: -9,
    objectFit: 'contain',
  },
}

const StoriesTopic = ({ classes, className }) => (
  <div className={cx(classes.root, className)}>
    <TopicText>
      Stories are short blog posts illustrated with related payments, photos,
      <br />
      and videos to keep the community updated via social media and Frank.
      <br />
      <br />
      Each piece you share is invaluable and helps to inform, teach, inspire the
      <br />
      community — especially if you have something you’d like to do differently
      the <br /> next time.
    </TopicText>
    <img className={classes.image} src={imgUrl} alt="stories" />
  </div>
)

export default injectStyles(styles)(StoriesTopic)
