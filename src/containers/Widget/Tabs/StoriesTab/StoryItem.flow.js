// @flow

export type StoryItemClassNames = {|
  root: ?string,
  image: ?string,
  withImage: ?string,
  title: ?string,
  stats: ?string,
  text: ?string,
|}

export type Props = {|
  classes: Object,
  classNames: ?StoryItemClassNames,
  data: Object,
|}
