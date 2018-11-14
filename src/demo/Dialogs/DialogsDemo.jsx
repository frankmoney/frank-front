// @flow
import React from 'react'
import Button from 'components/kit/Button'
import Dialog from 'components/kit/Dialog'
import ConfirmDialog from 'components/kit/Dialog/ConfirmDialog'
import Demo, { Row } from 'demo/Demo'
import Field from 'components/kit/fields/Field'
import TextBox from 'components/kit/TextBox'

const DialogsDemo = () => (
  <Demo gray>
    <h1>Dialogs</h1>
    <Row>
      <Dialog.Paper>
        <Dialog.Title>The story have unsaved changes</Dialog.Title>
        <Dialog.Message>
          You will lose unsaved changes if you navigate away without saving.
          Would you like to continue?
        </Dialog.Message>
        <Dialog.Buttons>
          <Button color="gray" label="Cancel" />
          <Button color="green" label="Confirm" />
        </Dialog.Buttons>
      </Dialog.Paper>
    </Row>
    <h2>Nested dialogs</h2>
    <Dialog.State>
      {({ open, toggle }) => (
        <Row centered>
          <>
            <Button onClick={() => toggle(true)} label="Open modal" />
            <Dialog
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              open={open}
              onClose={() => toggle(false)}
            >
              <Dialog.State>
                {({ open: openSecond, toggle: toggleSecond }) => (
                  <>
                    <Dialog.Title>First modal</Dialog.Title>
                    <Dialog.Message>Some text</Dialog.Message>
                    <Dialog.Field label="Name" placeholder="Frank">
                      <TextBox />
                    </Dialog.Field>
                    <Dialog.Field label="Surname" placeholder="Sinatra">
                      <TextBox />
                    </Dialog.Field>
                    <Dialog.Buttons>
                      <Button
                        onClick={() => toggleSecond(true)}
                        label="Open confirm modal"
                      />
                    </Dialog.Buttons>
                    <ConfirmDialog
                      title="This is a Second modal"
                      message="Some text"
                      confirmLabel="Close both"
                      cancelLabel="Close one"
                      open={openSecond}
                      onConfirm={() => {
                        toggle(false)
                      }}
                      onClose={() => {
                        toggleSecond(false)
                      }}
                    />
                  </>
                )}
              </Dialog.State>
            </Dialog>
          </>
        </Row>
      )}
    </Dialog.State>
  </Demo>
)

export default DialogsDemo
