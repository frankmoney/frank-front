// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import GlobeIcon from 'material-ui-icons/Public'
import { TextButton } from 'components/kit/Button'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = {
  anchor: {
    textDecoration: 'none',
  },
}

type Props = {|
  ...InjectStylesProps,
  //
  label: string,
  href: string,
|}

const PublicLinkButton = ({ classes, className, label, url }: Props) => (
  <a href={url} className={cx(classes.anchor, className)}>
    <TextButton icon={<GlobeIcon />} larger label={label} />
  </a>
)

export default injectStyles(styles)(PublicLinkButton)
