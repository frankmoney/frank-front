import { DOTS, getPages, getMonthPages, formatMonthSequence } from './utils'
import moment from 'moment'

const month = (m, y = 2017) => new Date(y, m - 1)

describe('number pagination', () => {
  it('should print *1* 2 … 56 > when 1-56', () => {
    expect(getPages(1, 1, 56)).toEqual([1, 2, DOTS, 56])
  })

  it('should print *1* … 77 78 > when 1-78, 78', () => {
    expect(getPages(78, 1, 78)).toEqual([77, 78])
  })
})

describe('month pagination', () => {
  it('should print "Dec 16, Jan 17, Feb 17, Mar 17, ..., Dec 17" when Dec 16-Dec 17, current Feb 17', () => {
    const input = [month(2), month(12, 2016), month(12)]
    const output = [
      month(12, 2016),
      month(1),
      month(2),
      month(3),
      DOTS,
      month(12),
    ]

    expect(getMonthPages(...input)).toEqual(output)
  })

  it('should print "Dec 16, ..., May 17, Jun, Jul, ..., Dec 17" when Dec 16-Dec 17, current Jun 17', () => {
    const input = [month(6), month(12, 2016), month(12)]
    const output = [
      month(12, 2016),
      DOTS,
      month(5),
      month(6),
      month(7),
      DOTS,
      month(12),
    ]

    expect(getMonthPages(...input)).toEqual(output)
  })

  it('should print "May 15, ..., May 17, Jun 17" when Jun 15-Jun 17, current Jun 17', () => {
    const input = [month(6), month(5, 2015), month(6)]
    const output = [month(5, 2015), DOTS, month(5), month(6)]

    expect(getMonthPages(...input)).toEqual(output)
  })
})

describe('months sequence formatting', () => {
  // May 15
  // May 15, Jun
  // May 15, Jun, Jul, Aug
  // May 15, Jun, Jul, ..., Nov 16, Dec
  // May 15, ..., Nov 16, Dec
  // May 15, ..., Nov 16, …, Nov 17, Dec
  // May 15, ..., Nov 18, …, Nov 20, Dec
  it('should print May 15, Nov 16, Dec, Jan 17, Dec', () => {
    const dates = [
      month(5, 2015),
      month(11, 2016),
      month(12, 2016),
      month(1, 2017),
      month(12, 2017),
    ]

    expect(formatMonthSequence(dates)).toEqual([
      "May '15",
      "Nov '16",
      'Dec',
      "Jan '17",
      'Dec',
    ])
  })
})
