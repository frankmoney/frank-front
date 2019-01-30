import * as R from 'ramda'

type Args = {
  totalSum: number,
  categories: {
    name: string,
    color: string,
    sum: number,
  }[],
  limit: number,
  precision?: number,
}

type Result = {
  items: {
    name: string,
    color: string,
    value: number,
  }[],
  others: null | number,
}

const getValue = (totalSum, categorySum, precision) =>
  categorySum === 0
    ? 0
    : Number(
        ((Math.abs(categorySum) / Math.abs(totalSum)) * 100).toFixed(precision)
      )

export default ({ totalSum, categories, limit, precision }: Args): Result => {
  const effectivePrecision = precision || 0
  const sortedCategories = R.sortBy(R.prop('sum'))(categories)

  const tooMany = sortedCategories.length > limit

  const items = R.take(tooMany ? limit - 1 : limit)(sortedCategories).map(
    ({ name, color, sum }) => ({
      name,
      color,
      value: getValue(totalSum, sum, effectivePrecision),
    })
  )

  const others = tooMany
    ? R.pipe(
        R.drop(limit - 1),
        R.map(R.prop('sum')),
        R.sum,
        x => getValue(totalSum, x, effectivePrecision)
      )(sortedCategories)
    : null

  return { items, others }
}
