import * as R from 'ramda'

export const mapStory = ({ data, ...other }) => {
  const storyData = R.omit(['countPayments'], data)
  const paymentsCount = data.countPayments

  return {
    ...other,
    ...storyData,
    paymentsCount,
  }
}
