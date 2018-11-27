// @flow strict-local
import React from 'react'
import Button from 'components/kit/Button'
import Dialog from 'components/kit/Dialog'
import PopoverDialog from 'components/kit/PopoverDialog'
import ConfirmDialog from 'components/kit/Dialog/ConfirmDialog'
import Demo, { Row } from 'demo/Demo'
import TextBox from 'components/kit/TextBox'
import TextField from 'components/kit/TextField'
import ToggleButton from 'components/kit/ToggleButton'

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
          <Dialog.Button color="gray" label="Cancel" />
          <Dialog.Button color="green" label="Confirm" />
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
                      <Dialog.Button
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
    <h2>Popover dialogs</h2>
    <Row centered>
      <PopoverDialog
        width={350}
        button={<ToggleButton label="Change password" />}
      >
        <TextField stretch type="password" floatingLabel="New password" />
        <TextField stretch type="password" floatingLabel="Repeat password" />
      </PopoverDialog>
    </Row>
  </Demo>
)

export default DialogsDemo
