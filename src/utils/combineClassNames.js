import * as R from 'ramda'
import cx from 'classnames'

export default (localClasses, passedClasses) =>
  passedClasses ? R.mergeWith(cx, localClasses, passedClasses) : localClasses
