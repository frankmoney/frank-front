// @flow
import React from 'react'
import { Calendar, DateFnsUtils } from '@frankmoney/datepicker'
import { withState, toRenderProps } from 'recompose'
import Demo, { Row } from 'demo/Demo'
import Paper from 'components/kit/Paper'
import DateSelect from 'components/kit/DateSelect'

const CalendarState = toRenderProps(withState('date', 'onChange', null))

const DateSelectsDemo = () => (
  <Demo>
    <h1>Date Select</h1>
    <Row centered>
      <DateSelect placeholder="Any date" format="ddd, M/DD/YYYY" />
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
