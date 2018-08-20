// import moment from 'moment'

export const DOTS = '…'

/*
1) страницы по 30 пейментов,
2) видна одна страница вправо-влево от текущей, но всегда не больше 4-х страниц,
3) есть пропуск для основной массы страниц,
4) всегда видно самую последнюю старнцу,
6) текущая страница — выделена, без ссылки,
7) наверху страницы выводится Page 6 of 56 (без ссылок), внизу — пагинатор
8) если какие-то страницы не видно в пагинаторе, есть переход вперед/назад
9) есть переход на самую первую страницу, если мы на 3-й или дальше

*1* 2 3 … 56 >
< 1 *2* 3 … 56 >
|< < 2 *3* 4 … 56 >
|< < 7 8 9 *10* >
|< < 53 54 *55* 56 >
 */
export function getPages(current, start = 1, end, minRange = 4) {
  const delta = 1
  let left = current - delta
  let right = Math.min(
    current === start ? current + delta + 1 : current + delta,
    end
  )
  if (end - current < minRange) {
    right = end
    left = right - minRange + 1
  }
  const range = []
  const rangeWithDots = []

  // get numbers
  for (let i = start; i <= end; i++) {
    if (i === end || (i >= left && i <= right)) {
      range.push(i)
    }
  }

  // add dots
  let prev
  for (const i of range) {
    if (prev) {
      if (i - prev !== 1) {
        rangeWithDots.push(DOTS)
      }
    }
    rangeWithDots.push(i)
    prev = i
  }

  return rangeWithDots
}

export function getMonthPages(current, start, end, minRange) {
  return null
}

/*
1) список разбит на месяцы, пагинация идет по месяцам,
2) если в текущем фильтре меньше 30 пейментов, пагинации нет,
3) месяцы без пейментов выводятся в пагинаторе,
4) наверху страницы выводится текущий месяц и год пагинатора; если в списке несколько месяцев сразу (см. 2), то ничего не выводится,
5) есть пропуск для основной массы месяцев, если их больше 5 в фильтре,
6) выводится плюс-минус месяц, а также последний месяцы в фильтре,
5) у первого месяца года ставится год; если в пропуске сменился год, у первого месяца после пропуска тоже выводится год
6) месяцы выводятся трехбуквенным сокращением, год — '99
7) если какие-то месяцы не поместились в пагинатор (их больше пяти), выводятся контролы вперед-назад (кроме первого и последнего месяца)

// TODO uncomment when get rid from moment

//
// Jan '17 Feb Mar Apr
// Jan '17 Feb Mar Apr
// Dec '17 Jan '18 Feb Mar Apr
// Jan '17 Feb Mar ... Dec '18 >
// < Jan '17 ... Nov Dec '18
// < Jan '17 Feb Mar ... Dec '18 >
// < Jan '17 ... Jun July Aug ... Dec >
// < Jan '15 ... Jun '17 July Aug ... Dec '18 >
//  */
// export function getMonthPages(current, start, end, minRange) {
//   const delta = 1
//   let left
//   let right
//   if (
//     moment(current).diff(start, 'months') < minRange - 1 &&
//     moment(current).diff(start, 'months') >= 0
//   ) {
//     left = start
//     right = moment
//       .min(moment(start).add(minRange - 1, 'month'), moment(end))
//       .toDate()
//   } else if (moment(end).diff(current, 'months') < minRange - 1) {
//     right = end
//     left = moment
//       .min(moment(current), moment(end).subtract(minRange - 2, 'months'))
//       .toDate()
//   } else {
//     left = moment(current)
//       .subtract(delta, 'month')
//       .toDate()
//     right = moment(current)
//       .add(delta + 1, 'month')
//       .toDate()
//   }
//   const range = []
//   const rangeWithDots = []
//
//   // get numbers
//   for (
//     let i = start;
//     i <= end;
//     i = moment(i)
//       .add(1, 'month')
//       .toDate()
//   ) {
//     if (+i === +start || +i === +end || (i >= left && i < right)) {
//       range.push(i)
//     }
//   }
//
//   // add dots
//   let prev
//   for (const i of range) {
//     if (prev) {
//       if (moment(i).diff(prev, 'months') > 1) {
//         rangeWithDots.push(DOTS)
//       }
//     }
//     rangeWithDots.push(i)
//     prev = i
//   }
//
//   return rangeWithDots
// }
//
// export function formatMonthSequence(dates) {
//   const formatted = []
//   let lastDate
//   for (const date of dates) {
//     const idx = dates.indexOf(date)
//     if (date !== DOTS) {
//       if (
//         idx === 0 ||
//         (lastDate && date.getFullYear() !== lastDate.getFullYear())
//       ) {
//         formatted.push(moment(date).format("MMM 'YY"))
//       } else {
//         formatted.push(moment(date).format('MMM'))
//       }
//       lastDate = date
//     } else {
//       formatted.push(date)
//     }
//   }
//
//   return formatted
// }
