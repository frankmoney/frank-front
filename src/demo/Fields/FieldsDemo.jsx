import React from 'react'
import Demo, { Row } from 'demo/Demo'
import Switch from 'components/kit/Switch'
import SwitchBase from 'components/kit/SwitchBase'
import TextBox from 'components/kit/TextBox'
import Field from 'components/kit/fields/Field'
import { injectStyles } from 'utils/styles'
import Playground from './Playground'

const styles = {
  playgroundWrap: {
    height: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: 500,
  },
  playground: {},
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
    <Demo>
      <div className={classes.playgroundWrap}>
        <Playground className={classes.playground} />
      </div>
      <h1>TextBox</h1>
      {states}
      <Row>
        <Field label="Name">
          <TextBox />
        </Field>
        <Field label="Name" focus>
          <TextBox />
        </Field>
        <Field defaultValue="Nick" label="Name">
          <TextBox />
        </Field>
        <Field defaultValue="Tom" label="Name" error="Error" invalid>
          <TextBox />
        </Field>
        <Field defaultValue="Tom" label="Name" error="Error" invalid focus>
          <TextBox />
        </Field>
      </Row>
      <h1>Additional label</h1>
      {states}
      <Row>
        <Field label="Name" additionalLabel="Additional label">
          <TextBox />
        </Field>
        <Field label="Name" additionalLabel="Additional label" focus>
          <TextBox />
        </Field>
        <Field
          defaultValue="Nick"
          label="Name"
          additionalLabel="Additional label"
        >
          <TextBox />
        </Field>
        <Field
          defaultValue="Tom"
          label="Name"
          additionalLabel="Additional label"
          error="Error"
          invalid
        >
          <TextBox />
        </Field>
        <Field
          defaultValue="Tom"
          label="Name"
          additionalLabel="Additional label"
          error="Error"
          invalid
          focus
        >
          <TextBox />
        </Field>
      </Row>
      <h2>Floating label</h2>
      {states}
      <Row>
        <Field floatingLabel="Name">
          <TextBox />
        </Field>
        <Field floatingLabel="Name" focus>
          <TextBox />
        </Field>
        <Field defaultValue="Nick" floatingLabel="Name">
          <TextBox />
        </Field>
        <Field defaultValue="Tom" floatingLabel="Name" error="Error" invalid>
          <TextBox />
        </Field>
        <Field
          defaultValue="Tom"
          floatingLabel="Name"
          error="Error"
          invalid
          focus
        >
          <TextBox />
        </Field>
      </Row>
      <h2>Multiline</h2>
      {states}
      <Row>
        <Field label="Fixed label">
          <TextBox multiLine />
        </Field>
        <Field label="Fixed label" focus>
          <TextBox multiLine />
        </Field>
        <Field
          label="Fixed label"
          defaultValue="One solution is to reset the key to a random value or auto incrementing"
        >
          <TextBox multiLine />
        </Field>
        <Field
          label="Fixed label"
          invalid
          error="Error"
          defaultValue="One solution is to reset the key to a random value or auto incrementing"
        >
          <TextBox multiLine />
        </Field>
        <Field
          label="Fixed label"
          invalid
          focus
          error="Error"
          defaultValue="One solution is to reset the key to a random value or auto incrementing"
        >
          <TextBox multiLine />
        </Field>
      </Row>
      <h2>Placeholders</h2>
      <div className={classes.states}>
        <div>Normal floating</div>
        <div>Focus floating</div>
        <div>Normal fixed</div>
        <div>Focus fixed</div>
        <div>Multiline</div>
      </div>
      <Row>
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
      </Row>
      <h2>Larger size</h2>
      {states}
      <Row>
        <Field label="Name" larger placeholder="Frank Sinatra">
          <TextBox />
        </Field>
        <Field label="Name" larger focus placeholder="Frank Sinatra">
          <TextBox />
        </Field>
        <Field
          label="Name"
          defaultValue="Nick"
          larger
          placeholder="Frank Sinatra"
        >
          <TextBox />
        </Field>
        <Field
          label="Name"
          defaultValue="Tom"
          error="Error"
          larger
          invalid
          placeholder="Frank Sinatra"
        >
          <TextBox />
        </Field>
        <Field
          label="Name"
          defaultValue="Tom"
          error="Error"
          larger
          invalid
          focus
          placeholder="Frank Sinatra"
        >
          <TextBox />
        </Field>
      </Row>
      <Row>
        <Field label="Fixed label" larger placeholder="Frank Sinatra">
          <TextBox multiLine />
        </Field>
        <Field label="Fixed label" larger focus placeholder="Frank Sinatra">
          <TextBox multiLine />
        </Field>
        <Field
          label="Fixed label"
          larger
          placeholder="Frank Sinatra"
          defaultValue="One solution is to reset the key to a random value or auto incrementing"
        >
          <TextBox multiLine />
        </Field>
        <Field
          label="Fixed label"
          larger
          placeholder="Frank Sinatra"
          invalid
          error="Error"
          defaultValue="One solution is to reset the key to a random value or auto incrementing"
        >
          <TextBox multiLine />
        </Field>
        <Field
          label="Fixed label"
          placeholder="Frank Sinatra"
          larger
          invalid
          focus
          error="Error"
          defaultValue="One solution is to reset the key to a random value or auto incrementing"
        >
          <TextBox multiLine />
        </Field>
      </Row>
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
            <Row>
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
              <Field
                label="Fixed label"
                disabled={disabled}
                defaultValue="Nick"
              >
                <TextBox />
              </Field>
              <Field
                label="Fixed label"
                error="Error"
                invalid
                disabled={disabled}
                defaultValue="Tom"
              >
                <TextBox />
              </Field>
            </Row>
            <Row>
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
              <Field
                floatingLabel="Floating label"
                disabled={disabled}
                defaultValue="Nick"
              >
                <TextBox />
              </Field>
              <Field
                floatingLabel="Floating label"
                error="Error"
                invalid
                disabled={disabled}
                defaultValue="Tom"
              >
                <TextBox />
              </Field>
            </Row>
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
            <Row>
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
                defaultValue="Nick"
              >
                <TextBox />
              </Field>
            </Row>
          </>
        )}
      </SwitchBase>
    </Demo>
  )
}

export default injectStyles(styles)(FieldsDemo)
