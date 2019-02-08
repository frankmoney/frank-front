import { FixedHeader, BreadcrumbsItem } from '@frankmoney/components'
import React from 'react'
import cx from 'classnames'
import {
  School as IconSchool,
  MoveToInbox as NewIcon,
  ChromeReaderMode as LedgerIcon,
  BurstMode as StoriesIcon,
  Domain as DirectoryIcon,
  InsertChart as WidgetsIcon,
  RecentActors as TeamIcon,
  AddCircle as AddIcon,
} from 'material-ui-icons'
import Breadcrumbs from 'components/Breadcrumbs'
import { injectStyles } from 'utils/styles'
import {
  Team,
  AddAccount,
  New,
  Stories,
  Ledger,
  Directory,
  Widgets,
} from '../Topics'
import TopicText from '../Topics/TopicText'
import Title from './HowItWorksTitle'

const styles = {
  root: {
    background: '#fff',
    minHeight: '100vh',
  },
  content: {
    paddingTop: 155,
    paddingBottom: 155,
    width: 850,
    margin: '0 auto',
  },
  section: {
    '&:not(:first-child)': {
      marginTop: 155,
    },
  },
}

const HowItWorksPage = ({ classes, className }) => (
  <div className={cx(classes.root, className)}>
    <FixedHeader className={cx(classes.header, 'ui-fixed')}>
      <Breadcrumbs>
        <BreadcrumbsItem>How it works</BreadcrumbsItem>
      </Breadcrumbs>
    </FixedHeader>
    <div className={classes.content}>
      <div className={classes.section}>
        <Title icon={<IconSchool />}>Demo</Title>
        <TopicText>
          To get a better idea of the workflow you might want to play <br />
          with a Demo account filled it with fictional data.
        </TopicText>
      </div>
      <div className={classes.section}>
        <Title icon={<TeamIcon />}>Team</Title>
        <Team />
      </div>
      <div className={classes.section}>
        <Title icon={<AddIcon />}>Add account</Title>
        <AddAccount />
      </div>
      <div className={classes.section}>
        <Title icon={<NewIcon />}>New</Title>
        <New />
      </div>
      <div className={classes.section}>
        <Title icon={<LedgerIcon />}>Ledger</Title>
        <Ledger />
      </div>
      <div className={classes.section}>
        <Title icon={<StoriesIcon />}>Stories</Title>
        <Stories />
      </div>
      <div className={classes.section}>
        <Title icon={<DirectoryIcon />}>Directory</Title>
        <Directory />
      </div>
      <div className={classes.section}>
        <Title icon={<WidgetsIcon />}>Widgets</Title>
        <Widgets />
      </div>
    </div>
  </div>
)

export default injectStyles(styles)(HowItWorksPage)
