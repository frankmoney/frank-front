import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import Body from './Body'
import Footer from './Footer'
import Header from './Header'
import styles from './Card.jss'

const Card = ({
  classes,
  dateTime,
  delta,
  categoryColor,
  categoryName,
  auto,
}) => (
  <div className={classes.root}>
    <Header dateTime={dateTime} delta={delta} />
    <Body categoryColor={categoryColor} categoryName={categoryName} />
    <Footer auto={auto} />
  </div>
)

export default injectStyles(styles)(Card)
