// @flow strict

import { convertFromRaw } from 'draft-js'

interface Cover {
  thumbs: {|
    original: string,
    sized: string,
  |};
}

type DateRange = [string, string]

export type Story = {|
  body: {| text: string |},
  cover: ?Cover,
  id: string | number,
  paymentsCount: number,
  paymentsDateRange: DateRange,
  title: string,
|}

export const mapToPlainTextBody = body => {
  if (!body) {
    return null
  }

  if (body.draftjs) {
    return convertFromRaw(JSON.parse(body.draftjs))
      .getPlainText()
      .trim()
  }

  return (body.text || '').trim()
}
