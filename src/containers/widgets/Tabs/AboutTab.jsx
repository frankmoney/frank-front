// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import Totals from '../Totals'

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
|}

const AboutTab = ({ classes, className }: Props) => (
  <div className={cx(classes.root, className)}>
    <div className={classes.title}>MakeaChamp</div>
    <Totals className={classes.totals} />
    TODO
  </div>
)

export default injectStyles(styles)(AboutTab)
