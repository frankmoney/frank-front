import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import TopicText from '../TopicText'
import imgUrl from './topc_widgets.png'

const styles = {
  root: {},
  image: {
    width: '100%',
    objectFit: 'contain',
    position: 'relative',
    left: -10,
    top: -20,
  },
}

const WidgetsTopic = ({ classes, className }) => (
  <div className={cx(classes.root, className)}>
    <TopicText>
      Share or embed individual payments or your entire Ledger <br />
      to social media, articles, or your website.
    </TopicText>
    <img className={classes.image} src={imgUrl} alt="directory" />
  </div>
)

export default injectStyles(styles)(WidgetsTopic)
