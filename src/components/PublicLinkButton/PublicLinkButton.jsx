// @flow strict-local
import React from 'react'
import GlobeIcon from 'material-ui-icons/Public'
import { TextButton } from 'components/kit/Button'

type Props = {|
  label: string,
  url: string,
|}

const PublicLinkButton = ({ label, url, ...otherProps }: Props) => (
  <TextButton
    href={url}
    externalLink
    target="_blank"
    icon={<GlobeIcon />}
    larger
    label={label}
    {...otherProps}
  />
)

export default PublicLinkButton
