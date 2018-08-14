import React from 'react'
import { shallow } from 'enzyme'
import { inverse as b } from 'chalk'
import moment from 'moment'
import Pager from './Pager'
import { DOTS } from './utils'

describe('numbers', () => {
  const testNumbers = (props, result) => () => {
    const mount = shallow(React.createElement(Pager, props))
    expect(mount.dive().text()).toEqual(result)
  }

  describe('bad cases', () => {
    it(`0-1`, testNumbers({ current: 0, total: 1 }, ``))
    it(`2-1`, testNumbers({ current: 2, total: 1 }, ``))
    it(`null`, testNumbers({ current: null, total: null }, ``))
    it(`undefined`, testNumbers({ current: undefined, total: null }, ``))
  })

  describe('lower min range(1-3)', () => {
    /*
    min 1 max 4
    *1*
    *1* 2 >
    < 1 *2*
    *1* 2 3 >
    < 1 *2* 3 >
    < 1 2 *3*
     */
    it(`${b(1)}`, testNumbers({ current: 1, total: 1 }, `1`))
    it(`${b(1)} 2 >`, testNumbers({ current: 1, total: 2 }, `12>`))
    it(`< 1 ${b(2)}`, testNumbers({ current: 2, total: 2 }, `<12`))
    it(`${b(1)} 2 3 >`, testNumbers({ current: 1, total: 3 }, `123>`))
    it(`< 1 ${b(2)} 3 >`, testNumbers({ current: 2, total: 3 }, `<123>`))
    it(`< 1 2 ${b(3)} >`, testNumbers({ current: 3, total: 3 }, `<123`))
  })

  describe('bigger than min range(1-9)', () => {
    /*
    min 1 max 9
    *1* 2 3 … 9 >
    < 1 *2* 3 … 9 >
    |< < 2 *3* 4 … 9 >
    |< < 3 *4* 5 … 9 >
    |< < *6* 7 8 9 >
    |< < 6 *7* 8 9 >
    |< < 6 7 *8* 9 >
    |< < 6 7 8 *9*
     */
    it(
      `${b(1)} 2 3 … 9 >`,
      testNumbers({ current: 1, total: 9 }, `123${DOTS}9>`)
    )
    it(
      `< 1 ${b(2)} 3 … 9 >`,
      testNumbers({ current: 2, total: 9 }, `<123${DOTS}9>`)
    )
    it(
      `|<< 2 ${b(3)} 4 … 9 >`,
      testNumbers({ current: 3, total: 9 }, `|<<234${DOTS}9>`)
    )
    it(
      `|<< 3 ${b(4)} 5 … 9 >`,
      testNumbers({ current: 4, total: 9 }, `|<<345${DOTS}9>`)
    )
    it(`|<< ${b(6)} 7 8 9 >`, testNumbers({ current: 6, total: 9 }, `|<<6789>`))
    it(`|<< 6 ${b(7)} 8 9 >`, testNumbers({ current: 7, total: 9 }, `|<<6789>`))
    it(`|<< 6 7 ${b(8)} 9 >`, testNumbers({ current: 8, total: 9 }, `|<<6789>`))
    it(`|<< 6 7 8 ${b(9)} >`, testNumbers({ current: 9, total: 9 }, `|<<6789`))
  })

  describe('exact in min range(1-4)', () => {
    /*
    min 1 max 4
    *1* 2 3 4 >
    |< < 1 *2* 3 4 >
    |< < 1 2 *3* 4 >
    |< < 1 2 3 *4*
     */
    it(`${b(1)} 2 3 4 >`, testNumbers({ current: 1, total: 4 }, `1234>`))
    it(`< 1 ${b(2)} 3 4 >`, testNumbers({ current: 2, total: 4 }, `<1234>`))
    it(`< 1 2 ${b(3)} 4 >`, testNumbers({ current: 3, total: 4 }, `<1234>`))
    it(`< 1 2 3 ${b(4)}`, testNumbers({ current: 4, total: 4 }, `<1234`))
  })

  describe('medium range(1-5)', () => {
    /*
    min 1 max 5
    *1* 2 3 … 5 >
    |< < *2* 3 4 5 >
    |< < 2 *3* 4 5 >
    |< 2 3 *4* 5 >
    |< 2 3 4 *5*
     */
    it(
      `${b(1)} 2 3 … 5 >`,
      testNumbers({ current: 1, total: 5 }, `123${DOTS}5>`)
    )
    it(
      `|< < ${b(2)} 3 4 5 >`,
      testNumbers({ current: 2, total: 5 }, `|<<2345>`)
    )
    it(
      `|< < 2 ${b(3)} 4 5 >`,
      testNumbers({ current: 3, total: 5 }, `|<<2345>`)
    )
    it(
      `|< < 2 3 ${b(4)} 5 >`,
      testNumbers({ current: 4, total: 5 }, `|<<2345>`)
    )
    it(`|< < 2 3 4 ${b(5)}`, testNumbers({ current: 5, total: 5 }, `|<<2345`))
  })
})

describe('months', () => {
  const testMonths = ({ current, start, total }, result) => () => {
    const parse = date => moment(date, 'MMM YY').toDate()
    const mount = shallow(
      React.createElement(Pager, {
        current: parse(current),
        start: parse(start),
        total: parse(total),
        type: 'months',
      })
    )
    expect(mount.dive().text()).toEqual(result.join(''))
  }

  describe('bad cases', () => {
    it(`empty`, () => {
      const mount = shallow(React.createElement(Pager, { type: 'months' }))
      expect(mount.dive().text()).toEqual('')
    })
    it(`null`, () => {
      const mount = shallow(
        React.createElement(Pager, {
          current: null,
          total: null,
          type: 'months',
        })
      )
      expect(mount.dive().text()).toEqual('')
    })
    it(`no end date should throw error`, () => {
      const mount = shallow(
        React.createElement(Pager, {
          current: new Date(),
          total: new Date(),
          type: 'months',
        })
      )
      expect(() => mount.dive()).toThrow()
    })
  })

  // May 15
  // May 15, Jun
  describe('lower than min range', () => {
    it(
      `${b('May 15')} Jun >`,
      testMonths({ start: 'May 15', current: 'May 15', total: 'Jun 15' }, [
        "May '15",
        'Jun',
        '>',
      ])
    )
    it(
      `${b('May 15')} Jun Jul >`,
      testMonths({ start: 'May 15', current: 'May 15', total: 'Jul 15' }, [
        "May '15",
        'Jun',
        'Jul',
        '>',
      ])
    )
  })

  // May 15, Jun, Jul, Aug
  // May 15, *Jun*, Jul, Aug
  // May 15, Jun, *Jul*, Aug
  // May 15, Jun, Jul, *Aug*
  describe('exact min range', () => {
    it(
      `< May 15 ${b('Jun')} Jul Aug >`,
      testMonths({ start: 'May 15', current: 'Jun 15', total: 'Aug 15' }, [
        '<',
        "May '15",
        'Jun',
        'Jul',
        'Aug',
        '>',
      ])
    )
    it(
      `< May 15 Jun ${b('Jul')} Aug >`,
      testMonths({ start: 'May 15', current: 'Jul 15', total: 'Aug 15' }, [
        '<',
        "May '15",
        'Jun',
        'Jul',
        'Aug',
        '>',
      ])
    )
    it(
      `< May 15 Jun Jul ${b('Aug')}`,
      testMonths({ start: 'May 15', current: 'Aug 15', total: 'Aug 15' }, [
        '<',
        "May '15",
        'Jun',
        'Jul',
        'Aug',
      ])
    )
  })

  // *May 15*, Jun, Jul, …, Nov 16
  // May 15, *Jun*, Jul, …, Nov 16
  // May 15, Jun, *Jul*, …, Nov 16
  // May 15, …, Jul, *Aug*, Sep, …, Nov 16
  // May 15, …, *Sep*, Oct, Nov 16
  // May 15, …, Sep, *Oct*, Nov 16
  // May 15, …, Sep, Oct, *Nov 16*

  describe('greater than min range', () => {
    it(
      `${b('May 15')} Jun Jul … Nov 16 >`,
      testMonths({ start: 'May 15', current: 'May 15', total: 'Nov 16' }, [
        "May '15",
        'Jun',
        'Jul',
        DOTS,
        "Nov '16",
        '>',
      ])
    )
    it(
      `< May 15 ${b('Jun')} Jul … Nov 16 >`,
      testMonths({ start: 'May 15', current: 'Jun 15', total: 'Nov 16' }, [
        '<',
        "May '15",
        'Jun',
        'Jul',
        DOTS,
        "Nov '16",
        '>',
      ])
    )
    it(
      `< May 15 Jun ${b('Jul')} … Nov 16 >`,
      testMonths({ start: 'May 15', current: 'Jul 15', total: 'Nov 16' }, [
        '<',
        "May '15",
        'Jun',
        'Jul',
        DOTS,
        "Nov '16",
        '>',
      ])
    )
    it(
      `< May 15 … Jul ${b('Aug')} Sep … Nov 16 >`,
      testMonths({ start: 'May 15', current: 'Aug 15', total: 'Nov 16' }, [
        '<',
        "May '15",
        DOTS,
        'Jul',
        'Aug',
        'Sep',
        DOTS,
        "Nov '16",
        '>',
      ])
    )
    it(
      `< May 15 … Jul 16 ${b('Aug')} Sep … Nov >`,
      testMonths({ start: 'May 15', current: 'Aug 16', total: 'Nov 16' }, [
        '<',
        "May '15",
        DOTS,
        "Jul '16",
        'Aug',
        'Sep',
        DOTS,
        'Nov',
        '>',
      ])
    )
    it(
      `< May 15 … ${b('Sep 16')} Oct Nov >`,
      testMonths({ start: 'May 15', current: 'Sep 16', total: 'Nov 16' }, [
        '<',
        "May '15",
        DOTS,
        "Sep '16",
        'Oct',
        'Nov',
        '>',
      ])
    )
    it(
      `< May 15 … Sep 16 ${b('Oct')} Nov >`,
      testMonths({ start: 'May 15', current: 'Oct 16', total: 'Nov 16' }, [
        '<',
        "May '15",
        DOTS,
        "Sep '16",
        'Oct',
        'Nov',
        '>',
      ])
    )
    it(
      `< May 15 … Sep 16 Oct ${b('Nov')}`,
      testMonths({ start: 'May 15', current: 'Nov 16', total: 'Nov 16' }, [
        '<',
        "May '15",
        DOTS,
        "Sep '16",
        'Oct',
        'Nov',
      ])
    )
  })

  // May 15, …, Nov 16, Dec
  // May 15, …, Nov 16, …, Nov 17
  // May 15, …, Nov 18, …, Nov 20
  describe('greater than min range and multiple years', () => {
    it(
      `< May 15 … Oct 16 ${b('Nov')} Dec … Nov 17 >`,
      testMonths({ start: 'May 15', current: 'Nov 16', total: 'Nov 17' }, [
        '<',
        "May '15",
        DOTS,
        "Oct '16",
        'Nov',
        'Dec',
        DOTS,
        "Nov '17",
        '>',
      ])
    )
    it(
      `< May 15 … Nov 16 ${b('Dec')} Jan 17 … Nov >`,
      testMonths({ start: 'May 15', current: 'Dec 16', total: 'Nov 17' }, [
        '<',
        "May '15",
        DOTS,
        "Nov '16",
        'Dec',
        "Jan '17",
        DOTS,
        'Nov',
        '>',
      ])
    )
    it(
      `< May 15 … Nov 16 ${b('Dec')} Jan 17 … Nov 20 >`,
      testMonths({ start: 'May 15', current: 'Dec 16', total: 'Nov 20' }, [
        '<',
        "May '15",
        DOTS,
        "Nov '16",
        'Dec',
        "Jan '17",
        DOTS,
        "Nov '20",
        '>',
      ])
    )
  })
})
