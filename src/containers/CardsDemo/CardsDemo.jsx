import React from 'react'
import Card from 'components/Card'
import CurrencyProvider from 'components/CurrencyProvider'

const CardsDemo = () => (
  <CurrencyProvider code="USD">
    <Card dateTime="2018-04-14 12:34" delta="-99.00" />
    <Card
      dateTime="2018-01-01 19:05"
      delta="+1,392.32"
      categoryColor="#8725FB"
      categoryName="Marketing"
      auto
    />
  </CurrencyProvider>
)

export default CardsDemo
