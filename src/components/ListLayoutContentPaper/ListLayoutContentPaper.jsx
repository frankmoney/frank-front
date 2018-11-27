// @flow strict-local
import React from 'react'
import Paper from 'components/kit/Paper'
import ListLayoutContentBlock from 'components/ListLayoutContentBlock'

type Props = {|
  className?: string,
|}

const ListLayoutContentPaper = (props: Props) => (
  <ListLayoutContentBlock>
    <Paper type="card" {...props} />
  </ListLayoutContentBlock>
)

export default ListLayoutContentPaper
