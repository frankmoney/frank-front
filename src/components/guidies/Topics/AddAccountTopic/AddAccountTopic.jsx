import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import TopicText from '../TopicText'
import imgUrl from './topic_account.png'

const styles = {
  root: {},
  image: {
    width: 798,
    marginTop: 15,
    marginBottom: 45,
  },
}

const AddAccountTopic = ({ classes, className }) => (
  <div className={cx(classes.root, className)}>
    <img className={classes.image} src={imgUrl} alt="american_banks_logos" />
    <TopicText>
      Get started by Connecting your bank account. <br />
      We support over 8000 US banks.
    </TopicText>
  </div>
)

export default injectStyles(styles)(AddAccountTopic)
