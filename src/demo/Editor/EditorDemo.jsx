// @flow
import React from 'react'
import { withState, toRenderProps } from 'recompose'
import { EditorState, ContentState } from 'draft-js'
import { injectStyles } from 'utils/styles'
import Demo, { Row } from 'demo/Demo'
import Paper from 'components/kit/Paper'
import Editor from 'components/kit/Editor'

const styles = theme => ({
  editorWrap: {
    width: 750,
    padding: 40,
    paddingRight: 0,
    overflow: 'unset',
  },
  editor: {
    width: '100%',
    minHeight: 500,
  },
})

const defaultText = `The Aleph Institute requests $250,000 grant from Snap Foundation of Los Angeles (The Foundation) to support Project Tikvah, its innovative program that serves troubled youth facing incarceration or already in prison due to addiction or mental illness.

Project Tikvah is a new Jewish program that advocates for alternative sentencing options and effective intervention solutions for hundreds of struggling youth, primarily ages 16-32.

Tikvah, which means hope in Hebrew, advocates for an end to the counterproductive measures and devastating impacts of incarceration by offering a humane and holistic solution: advocacy for court-approved alternatives to prison sentencing, placement in appropriate detox and rehab facilities, referrals to counseling and mental-health professionals, spiritual guidance, family engagement, and ongoing supervision from onset of crisis to complete recovery.`

const EditorRenderState = toRenderProps(
  withState(
    'editorState',
    'onChange',
    EditorState.createWithContent(ContentState.createFromText(defaultText))
  )
)

const EditorDemo = ({ classes }) => (
  <Demo gray>
    <h1>Editor</h1>
    <EditorRenderState>
      {state => (
        <Row centered>
          <Paper className={classes.editorWrap}>
            <Editor
              placeholder="Type your story here..."
              className={classes.editor}
              {...state}
            />
          </Paper>
        </Row>
      )}
    </EditorRenderState>
  </Demo>
)

export default injectStyles(styles)(EditorDemo)
