// @flow
import React from 'react'
import { Calendar, DateFnsUtils } from '@frankmoney/datepicker'
import { withState, toRenderProps } from 'recompose'
import Demo, { Row } from 'demo/Demo'
import Paper from 'components/kit/Paper'
import DateSelect, { MonthSelect } from 'components/kit/DateSelect'

const CalendarState = toRenderProps(withState('date', 'onChange', null))

// eslint-disable-next-line no-console
const printValue = value => console.log('new value:', value)

const DateSelectsDemo = () => (
  <Demo>
    <h1>Date Select</h1>
    <Row centered>
      <DateSelect placeholder="Any date" format="ddd, M/DD/YYYY" />
    </Row>
    <h1>Month Select</h1>
    <Row centered>
      <MonthSelect value={new Date()} onChange={printValue} />
    </Row>
    <Row centered>
      <MonthSelect label="To" useEndOfTheMonth onChange={printValue} />
    </Row>
    <h1>Calendar</h1>
    <Row centered>
      <Paper>
        <CalendarState>
          {stateProps => (
            <Calendar
              minDate={new Date()}
              utils={DateFnsUtils}
              {...stateProps}
            />
          )}
        </CalendarState>
      </Paper>
    </Row>
  </Demo>
)

export default DateSelectsDemo
