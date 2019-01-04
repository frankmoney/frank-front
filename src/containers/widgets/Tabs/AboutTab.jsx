// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import TotalsComponent from 'containers/widgets/Totals'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

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
    margin: [29, -15, 0],
  },
  link: {
    margin: [28, 0, 0, -2],
  },
  description: {
    ...theme.fontRegular(18, 28),
    color: '#666B7B',
    margin: [29, 0, 0, 1],
  },
})

type Props = {|
  ...InjectStylesProps,
  //
  description: ?string,
  name: ?string,
  Totals: ?React.Element<typeof TotalsComponent>,
|}

const AboutTab = ({ classes, className, description, name, Totals }: Props) => (
  <div className={cx(classes.root, className)}>
    {name && <div className={classes.title}>{name}</div>}
    {Totals && React.cloneElement(Totals, { className: classes.totals })}
    {/* <PublicLinkButton
      className={classes.link}
      url={'google.com'}
      label={'google.com'}
    /> */}
    {description && <div className={classes.description}>{description}</div>}
  </div>
)

export default injectStyles(styles)(AboutTab)
