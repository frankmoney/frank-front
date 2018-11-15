// @flow strict

const getBody = (): HTMLBodyElement =>
  // flowlint-next-line unclear-type:off
  (document.body: any)

export default getBody
