import { Observable } from 'rxjs'
import { isNotFoundError } from './graphql'

export const handleError = actionCreator => error => {
  const isNotFound = isNotFoundError(error)
  const actionObservable = Observable.of(
    actionCreator({ error, notFound: isNotFound })
  )

  return isNotFound
    ? actionObservable
    : Observable.merge(actionObservable, Observable.throw(error))
}
