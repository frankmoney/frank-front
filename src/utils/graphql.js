// @flow strict-local
type Response = {
  status: number,
  errors: Array<Object>, // flowlint-line unclear-type:off
}

type GraphqlResult = {
  request: Object, // flowlint-line unclear-type:off
  response: Response,
}

export const isNotFoundError = (graphqlError: GraphqlResult) => {
  const { response } = graphqlError
  if (!response) {
    console.warn('maybe not Graphql error') // eslint-disable-line no-console
    return false
  }

  const { errors } = response

  return errors.length > 0 && errors[0].message === 'Not Found'
}
