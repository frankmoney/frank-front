import React from 'react'
import * as TOPICS from '../Topics'
import TopicCard from './TopicCard'
import withLocalStorage from './withLocalStorage'

export default Object.entries(TOPICS).reduce(
  (map, [topicName, TopicComponent]) => {
    const Card = withLocalStorage(topicName)(TopicCard)
    return {
      ...map,
      [topicName]: props =>
        React.createElement(Card, props, React.createElement(TopicComponent)),
    }
  },
  {}
)
