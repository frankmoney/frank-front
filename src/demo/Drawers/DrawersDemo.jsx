// @flow strict-local
import React from 'react'
import Button from 'components/kit/Button'
import Drawer from 'components/kit/Drawer'
import Demo, { Row } from 'demo/Demo'
import TextBox from 'components/kit/TextBox'

const DrawersDemo = () => (
  <Demo gray>
    <h1>Drawer</h1>
    <Row>
      <Drawer.Paper style={{ maxHeight: 450 }}>
        <Drawer.Title buttons={<Drawer.CloseButton />}>
          Select payments and then select some more
        </Drawer.Title>
        <Drawer.Content>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num, idx) => (
            <div
              key={idx} // eslint-disable-line react/no-array-index-key
              style={{
                height: 55,
                margin: '0 30px',
                lineHeight: '55px',
                borderBottom: idx < 7 ? '1px solid rgba(0,0,0,0.07)' : 'none',
              }}
            >
              Google AdWords
            </div>
          ))}
        </Drawer.Content>
        <Drawer.Footer text="8 payments">
          <Button width={120} color="gray" label="Reset" />
          <Button width={120} color="green" label="Confirm" />
        </Drawer.Footer>
      </Drawer.Paper>
    </Row>
    <Row>
      <Drawer.Paper style={{ maxHeight: 450 }}>
        <Drawer.Title
          smaller
          clamp={3}
          buttons={[<Drawer.MaximizeButton />, <Drawer.CloseButton />]}
        >
          To provide users with the correct guidance to complete a purchase, the
          proposed system would use system users with the correct guidance to
          complete
        </Drawer.Title>
        <Drawer.Field
          label="Name"
          placeholder="Frank"
          style={{ marginBottom: 0 }}
        >
          <TextBox />
        </Drawer.Field>
        <Drawer.Content disableOverflowTop style={{ paddingTop: 20 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num, idx) => (
            <div
              key={idx} // eslint-disable-line react/no-array-index-key
              style={{
                height: 55,
                margin: '0 30px',
                lineHeight: '55px',
                borderBottom: idx < 7 ? '1px solid rgba(0,0,0,0.07)' : 'none',
              }}
            >
              Google AdWords
            </div>
          ))}
        </Drawer.Content>
        <Drawer.Footer>
          <Button width={120} color="green" label="Confirm" />
        </Drawer.Footer>
      </Drawer.Paper>
    </Row>
    <h2>Interactive drawer</h2>
    <Row centered>
      <Drawer.State>
        {({ open, toggle }) => (
          <>
            <Button onClick={() => toggle(true)} label="Open drawer" />
            <Drawer
              open={open}
              onClose={() => toggle(false)}
              title="To provide users with the correct guidance to complete a
                purchase, the proposed system would use system users with the
                correct guidance to complete"
              titleSmaller
              titleClamp={3}
              footerButtonLabel="Done"
              footerButtonProps={{ width: 120, onClick: () => toggle(false) }}
            >
              <Drawer.Field
                label="Name"
                placeholder="Frank"
                style={{ marginBottom: 0 }}
              >
                <TextBox />
              </Drawer.Field>
              <Drawer.Content disableOverflowTop style={{ paddingTop: 20 }}>
                {[
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                ].map((num, idx) => (
                  <div
                    key={idx} // eslint-disable-line react/no-array-index-key
                    style={{
                      height: 55,
                      margin: '0 30px',
                      lineHeight: '55px',
                      borderBottom:
                        idx < 23 ? '1px solid rgba(0,0,0,0.07)' : 'none',
                    }}
                  >
                    Google AdWords
                  </div>
                ))}
              </Drawer.Content>
            </Drawer>
          </>
        )}
      </Drawer.State>
    </Row>
  </Demo>
)

export default DrawersDemo
