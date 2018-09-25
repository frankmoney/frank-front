export const PAGE_SIZE = 8

export const SORT_BY = [
  { name: 'Name', graph: 'name_ASC', query: 'name' },
  { name: 'Date', graph: 'lastPaymentOn_DESC', query: 'date' },
  { name: 'Total', graph: 'total_DESC', query: 'total' },
]

export const SORT_BY_DEFAULT = SORT_BY[0].query
