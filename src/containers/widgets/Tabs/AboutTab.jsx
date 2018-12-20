// @flow strict-local
import React from 'react'
import cx from 'classnames'
import PublicLinkButton from 'components/PublicLinkButton'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import Totals, { type TotalsProps } from '../Totals'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    paddingTop: 8,
  },
  title: {
    ...theme.fontSemibold(40, 42),
  },
  totals: {
    margin: [30, 0, 0],
  },
  link: {
    margin: [28, 0, 0, -2],
  },
  description: {
    margin: [23, 0, 0, 1],
    ...theme.fontRegular(18, 28),
  },
})

type Props = {|
  ...InjectStylesProps,
  //
  name: ?string,
  totals: ?TotalsProps,
|}

const AboutTab = ({ classes, className, name, totals }: Props) => (
  <div className={cx(classes.root, className)}>
    {name && <div className={classes.title}>{name}</div>}
    {totals && <Totals className={classes.totals} {...totals} />}
    <PublicLinkButton
      className={classes.link}
      url={'google.com'}
      label={'google.com'}
    />
    <div className={classes.description}>
      MakeaChamp is the leader in crowdfunding for competitive sports. Our
      global platform aims to level the playing field and ensure every
      competitive athlete.
    </div>
  </div>
)

export default injectStyles(styles)(AboutTab)
