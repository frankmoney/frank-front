import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import Checkbox from 'components/kit/Checkbox'
import Switch from 'components/kit/Switch'
import SwitchBase from 'components/kit/SwitchBase'
import TextBox from 'components/kit/TextBox'
import Field from 'components/kit/fields/Field'
import DemoMenu from 'demo/DemoMenu'
import Playground from './Playground'

const styles = {
  demo: {
    alignItems: 'center',
    background: '#fff',
    color: '#252B43',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 100,
    paddingTop: 100,
    '& > h1': {
      marginTop: 70,
      marginBottom: 110,
      fontSize: 60,
      lineHeight: 60,
      fontWeight: 500,
      '&:first-child': {
        marginTop: 0,
      },
    },
    '& > h2': {
      marginTop: 80,
      marginBottom: 60,
      fontSize: 40,
      lineHeight: 50,
      fontWeight: 500,
    },
  },
  playgroundWrap: {
    height: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  playground: {},
  row: {
    display: 'flex',
    alignItems: 'flex-start',
    width: 900,
    '& > *': {
      marginRight: 20,
    },
    marginBottom: 50,
  },
  centered: {
    justifyContent: 'center',
  },
  states: {
    display: 'flex',
    alignItems: 'flex-start',
    width: 900,
    '& > *': {
      marginRight: 20,
      width: '100%',
      fontSize: 16,
      fontWeight: 500,
      color: '#252B43',
    },
    marginBottom: 35,
  },
  button: {
    width: 160,
  },
}

const FieldsDemo = ({ classes }) => {
  const states = (
    <div className={classes.states}>
      <div>Normal</div>
      <div>Focus</div>
      <div>Filled</div>
      <div>Error</div>
      <div>Error&Focus</div>
    </div>
  )

  return (
    <div className={classes.demo}>
      <DemoMenu />
      <div className={classes.playgroundWrap}>
        <Playground className={classes.playground} />
      </div>
      <h1>Checkbox</h1>
      <div className={cx(classes.row, classes.centered)}>
        <Checkbox />
        <Checkbox defaultChecked />
        <Checkbox disabled />
      </div>
      <h1>TextBox</h1>
      {states}
      <div className={classes.row}>
        <Field label="Name">
          <TextBox />
        </Field>
        <Field label="Name" focus>
          <TextBox />
        </Field>
        <Field label="Name">
          <TextBox defaultValue="Nick" />
        </Field>
        <Field label="Name" error="Error" invalid>
          <TextBox defaultValue="Tom" />
        </Field>
        <Field label="Name" error="Error" invalid focus>
          <TextBox defaultValue="Tom" />
        </Field>
      </div>
      <h1>Additional label</h1>
      {states}
      <div className={classes.row}>
        <Field label="Name" additionalLabel="Additional label">
          <TextBox />
        </Field>
        <Field label="Name" additionalLabel="Additional label" focus>
          <TextBox />
        </Field>
        <Field label="Name" additionalLabel="Additional label">
          <TextBox defaultValue="Nick" />
        </Field>
        <Field
          label="Name"
          additionalLabel="Additional label"
          error="Error"
          invalid
        >
          <TextBox defaultValue="Tom" />
        </Field>
        <Field
          label="Name"
          additionalLabel="Additional label"
          error="Error"
          invalid
          focus
        >
          <TextBox defaultValue="Tom" />
        </Field>
      </div>
      <h2>Floating label</h2>
      {states}
      <div className={classes.row}>
        <Field floatingLabel="Name">
          <TextBox />
        </Field>
        <Field floatingLabel="Name" focus>
          <TextBox />
        </Field>
        <Field floatingLabel="Name">
          <TextBox defaultValue="Nick" />
        </Field>
        <Field floatingLabel="Name" error="Error" invalid>
          <TextBox defaultValue="Tom" />
        </Field>
        <Field floatingLabel="Name" error="Error" invalid focus>
          <TextBox defaultValue="Tom" />
        </Field>
      </div>
      <h2>Multiline</h2>
      {states}
      <div className={classes.row}>
        <Field label="Fixed label">
          <TextBox multiLine />
        </Field>
        <Field label="Fixed label" focus>
          <TextBox multiLine />
        </Field>
        <Field label="Fixed label">
          <TextBox
            multiLine
            defaultValue="One solution is to reset the key to a random value or auto incrementing"
          />
        </Field>
        <Field label="Fixed label" invalid error="Error">
          <TextBox
            multiLine
            defaultValue="One solution is to reset the key to a random value or auto incrementing"
          />
        </Field>
        <Field label="Fixed label" invalid focus error="Error">
          <TextBox
            multiLine
            defaultValue="One solution is to reset the key to a random value or auto incrementing"
          />
        </Field>
      </div>
      <h2>Placeholders</h2>
      <div className={classes.states}>
        <div>Normal floating</div>
        <div>Focus floating</div>
        <div>Normal fixed</div>
        <div>Focus fixed</div>
        <div>Multiline</div>
      </div>
      <div className={classes.row}>
        <Field floatingLabel="Floating label" placeholder="Type your name">
          <TextBox />
        </Field>
        <Field
          floatingLabel="Floating label"
          placeholder="Type your name"
          focus
        >
          <TextBox />
        </Field>
        <Field label="Fixed label" placeholder="Type your name">
          <TextBox />
        </Field>
        <Field label="Fixed label" placeholder="Type your name" focus>
          <TextBox />
        </Field>
        <Field
          label="Multiline"
          placeholder="Long long long long long long long long placeholder"
        >
          <TextBox minLines={3} multiLine />
        </Field>
      </div>
      <h2>Larger size</h2>
      {states}
      <div className={classes.row}>
        <Field label="Name" larger placeholder="Frank Sinatra">
          <TextBox />
        </Field>
        <Field label="Name" larger focus placeholder="Frank Sinatra">
          <TextBox />
        </Field>
        <Field label="Name" larger placeholder="Frank Sinatra">
          <TextBox defaultValue="Nick" />
        </Field>
        <Field
          label="Name"
          error="Error"
          larger
          invalid
          placeholder="Frank Sinatra"
        >
          <TextBox defaultValue="Tom" />
        </Field>
        <Field
          label="Name"
          error="Error"
          larger
          invalid
          focus
          placeholder="Frank Sinatra"
        >
          <TextBox defaultValue="Tom" />
        </Field>
      </div>
      <div className={classes.row}>
        <Field label="Fixed label" larger placeholder="Frank Sinatra">
          <TextBox multiLine />
        </Field>
        <Field label="Fixed label" larger focus placeholder="Frank Sinatra">
          <TextBox multiLine />
        </Field>
        <Field label="Fixed label" larger placeholder="Frank Sinatra">
          <TextBox
            multiLine
            defaultValue="One solution is to reset the key to a random value or auto incrementing"
          />
        </Field>
        <Field
          label="Fixed label"
          larger
          placeholder="Frank Sinatra"
          invalid
          error="Error"
        >
          <TextBox
            multiLine
            defaultValue="One solution is to reset the key to a random value or auto incrementing"
          />
        </Field>
        <Field
          label="Fixed label"
          placeholder="Frank Sinatra"
          larger
          invalid
          focus
          error="Error"
        >
          <TextBox
            multiLine
            defaultValue="One solution is to reset the key to a random value or auto incrementing"
          />
        </Field>
      </div>
      <SwitchBase defaultOn>
        {({ on: disabled, toggle }) => (
          <>
            <h2>
              Disabled <Switch checked={disabled} onChange={toggle} />
            </h2>
            <div className={classes.states}>
              <div>Normal</div>
              <div>Placeholder</div>
              <div>Filled</div>
              <div>Error</div>
            </div>
            <div className={classes.row}>
              <Field label="Fixed label" disabled={disabled}>
                <TextBox />
              </Field>
              <Field
                label="Fixed label"
                placeholder="Type name"
                disabled={disabled}
              >
                <TextBox />
              </Field>
              <Field label="Fixed label" disabled={disabled}>
                <TextBox defaultValue="Nick" />
              </Field>
              <Field
                label="Fixed label"
                error="Error"
                invalid
                disabled={disabled}
              >
                <TextBox defaultValue="Tom" />
              </Field>
            </div>
            <div className={classes.row}>
              <Field floatingLabel="Floating label" disabled={disabled}>
                <TextBox />
              </Field>
              <Field
                floatingLabel="Floating label"
                placeholder="Type name"
                disabled={disabled}
              >
                <TextBox />
              </Field>
              <Field floatingLabel="Floating label" disabled={disabled}>
                <TextBox defaultValue="Nick" />
              </Field>
              <Field
                floatingLabel="Floating label"
                error="Error"
                invalid
                disabled={disabled}
              >
                <TextBox defaultValue="Tom" />
              </Field>
            </div>
          </>
        )}
      </SwitchBase>
      <SwitchBase defaultOn>
        {({ on: loading, toggle }) => (
          <>
            <h2>
              Loading <Switch checked={loading} onChange={toggle} />
            </h2>
            <div className={classes.states}>
              <div>Normal</div>
              <div>Placeholder</div>
              <div>Error</div>
              <div>Filled</div>
            </div>
            <div className={classes.row}>
              <Field label="Fixed label" loading={loading}>
                <TextBox />
              </Field>
              <Field
                label="Fixed label"
                placeholder="Some placeholder"
                loading={loading}
                loadingText="Custom loading"
              >
                <TextBox />
              </Field>
              <Field
                label="Fixed label"
                placeholder="Some placeholder"
                error="Required"
                invalid
                loading={loading}
              >
                <TextBox />
              </Field>
              <Field
                label="Fixed label"
                placeholder="Some placeholder"
                loading={loading}
              >
                <TextBox defaultValue="Nick" />
              </Field>
            </div>
          </>
        )}
      </SwitchBase>
    </div>
  )
}

export default injectStyles(styles)(FieldsDemo)
