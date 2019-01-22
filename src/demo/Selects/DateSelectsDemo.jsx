// @flow
import React from 'react'
import { Calendar, DateFnsUtils } from '@frankmoney/datepicker'
import { withState, toRenderProps } from 'recompose'
import Demo, { Row } from 'demo/Demo'
import Paper from 'components/kit/Paper'
import DateSelect, { MonthSelect } from 'components/kit/DateSelect'

const CalendarState = toRenderProps(withState('date', 'onChange', null))

type PlaygroundState = {
  value: ?Date,
}

class MonthSelectPlayground extends React.Component<{}, PlaygroundState> {
  state = {
    value: null,
  }

  handleChange = value => {
    console.log('new value:', value) // eslint-disable-line no-console
    this.setState({ value })
  }

  render() {
    return (
      <>
        <Row centered>
          <MonthSelect
            label="Uncontrolled"
            defaultValue={new Date()}
            onChange={this.handleChange}
          />
        </Row>
        <Row centered>
          <MonthSelect
            label="Controlled"
            value={this.state.value}
            useEndOfTheMonth
            onChange={this.handleChange}
          />
        </Row>
      </>
    )
  }
}

const DateSelectsDemo = () => (
  <Demo>
    <h1>Date Select</h1>
    <Row centered>
      <DateSelect placeholder="Any date" format="ddd, M/DD/YYYY" />
    </Row>
    <h1>Month Select</h1>
    <MonthSelectPlayground />
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
