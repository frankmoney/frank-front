// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import Totals, { type TotalsProps } from '../Totals'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  title: {
    ...theme.fontMedium(28, 40), // TODO: variable font size
  },
  totals: {
    marginTop: 59, // FIXME: tmp
    width: 360,
    marginLeft: 2,
    // TODO: fix font size
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
    TODO
  </div>
)

export default injectStyles(styles)(AboutTab)
