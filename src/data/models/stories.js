// @flow strict-local
// spellchecker:ignore draftjs
import { convertFromRaw } from 'draft-js'

interface Cover {
  thumbs: {|
    original: string,
    sized: string,
  |};
}

type DateRange = [string, string]

type StoryBody = {|
  text?: string,
  draftjs?: string,
|}

export type StoryId = string | number

export type Story = {|
  body: StoryBody,
  cover: ?Cover,
  id: StoryId,
  paymentsCount: number,
  paymentsDateRange: DateRange,
  text: ?string,
  title: string,
|}

export const mapBodyToPlainText = (body: StoryBody): ?string => {
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

export const mapToPlainTextBody = ({ body, ...story }: Story): Story => ({
  text: mapBodyToPlainText(body),
  body,
  ...story,
})
