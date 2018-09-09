import { identity } from 'ramda'

const accounts = [
  `
  query {
    accounts {
      id
      name
    }
  }
  `,
  identity,
]

export default {
  accounts,
}
