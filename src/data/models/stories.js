// @flow strict

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
