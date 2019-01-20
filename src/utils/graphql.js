// @flow strict-local
import * as R from 'ramda'

type Response = {
  status: number,
  errors: Array<Object>, // flowlint-line unclear-type:off
}

type GraphqlResult = {
  request: Object, // flowlint-line unclear-type:off
  response: Response,
}

type ObservableError = {
  error: GraphqlResult,
}

export const isNotFoundGraphqlError = (response: ?Response) => {
  if (!response) {
    console.error('GraphQL error: no response') // eslint-disable-line no-console
    return false
  }
  const { status, errors } = response
  const error = R.pipe(
    R.head,
    R.prop('message')
  )(errors)
  return status === 200 && error === 'Not Found'
}

export const isNotFoundError = (observableError: ObservableError) => {
  const { error: graphqlError } = observableError
  const { response } = graphqlError
  return isNotFoundGraphqlError(response)
}
