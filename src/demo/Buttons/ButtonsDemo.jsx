// @flow
import React from 'react'
import {
  CheckCircle,
  Check,
  MoreHoriz,
  ChatBubble,
  List,
  Public,
} from 'material-ui-icons'
import { compose, withState, toRenderProps } from 'recompose'
import Checkbox from 'components/kit/Checkbox'
import Button, {
  BigButton,
  IconButton,
  IconPlainButton,
  SocialButton,
  TextButton,
} from 'components/kit/Button'
import Spinner from 'components/kit/Spinner'
import ToggleButton from 'components/kit/ToggleButton'
import { injectStyles } from 'utils/styles'
import Demo, { Row } from 'demo/Demo'

const styles = {
  button: {
    width: 160,
  },
}

const PlainButtonsState = toRenderProps(
  compose(
    withState('larger', 'toggleLarger', false),
    withState('hasIcon', 'toggleIcon', false)
  )
)

const ButtonsDemo = ({ classes }) => (
  <Demo>
    <h1>Button</h1>
    <Row>
      <Button className={classes.button} label="Submit" color="green" />
      <Button className={classes.button} label="Submit" color="green" hover />
      <Button className={classes.button} label="Submit" color="green" active />
      <Button
        className={classes.button}
        label="Submit"
        color="green"
        disabled
      />
      <Button className={classes.button} label="Submit" color="green" loading />
    </Row>
    <Row>
      <Button className={classes.button} label="Submit" color="gray" />
      <Button className={classes.button} label="Submit" color="gray" hover />
      <Button className={classes.button} label="Submit" color="gray" active />
      <Button className={classes.button} label="Submit" color="gray" disabled />
      <Button className={classes.button} label="Submit" color="gray" loading />
    </Row>
    <Row>
      <Button className={classes.button} label="Submit" color="red" />
      <Button className={classes.button} label="Submit" color="red" hover />
      <Button className={classes.button} label="Submit" color="red" active />
      <Button className={classes.button} label="Submit" color="red" disabled />
      <Button className={classes.button} label="Submit" color="red" loading />
    </Row>
    <Row>
      <Button className={classes.button} label="Submit" color="blue" />
      <Button className={classes.button} label="Submit" color="blue" hover />
      <Button className={classes.button} label="Submit" color="blue" active />
      <Button className={classes.button} label="Submit" color="blue" disabled />
      <Button className={classes.button} label="Submit" color="blue" loading />
    </Row>
    <Row>
      <Button className={classes.button} label="Submit" color="lightBlue" />
      <Button
        className={classes.button}
        label="Submit"
        color="lightBlue"
        hover
      />
      <Button
        className={classes.button}
        label="Submit"
        color="lightBlue"
        active
      />
      <Button
        className={classes.button}
        label="Submit"
        color="lightBlue"
        disabled
      />
      <Button
        className={classes.button}
        label="Submit"
        color="lightBlue"
        loading
      />
    </Row>
    <Row>
      <Button className={classes.button} label="Submit" color="lightGreen" />
      <Button
        className={classes.button}
        label="Submit"
        color="lightGreen"
        hover
      />
      <Button
        className={classes.button}
        label="Submit"
        color="lightGreen"
        active
      />
      <Button
        className={classes.button}
        label="Submit"
        color="lightGreen"
        disabled
      />
      <Button
        className={classes.button}
        label="Submit"
        color="lightGreen"
        loading
      />
    </Row>
    <Row>
      <Button
        className={classes.button}
        label="Submit"
        color="green"
        icon={<CheckCircle />}
      />
      <Button
        className={classes.button}
        label="Submit"
        color="green"
        icon={<CheckCircle />}
        hover
      />
      <Button
        className={classes.button}
        label="Submit"
        color="green"
        icon={<CheckCircle />}
        active
      />
      <Button
        className={classes.button}
        label="Submit"
        color="green"
        icon={<CheckCircle />}
        disabled
      />
      <Button
        className={classes.button}
        label="Submit"
        color="green"
        icon={<CheckCircle />}
        loading
      />
    </Row>
    <Row>
      <Button
        className={classes.button}
        label="Submit"
        color="gray"
        icon={<CheckCircle />}
      />
      <Button
        className={classes.button}
        label="Submit"
        color="gray"
        icon={<CheckCircle />}
        hover
      />
      <Button
        className={classes.button}
        label="Submit"
        color="gray"
        icon={<CheckCircle />}
        active
      />
      <Button
        className={classes.button}
        label="Submit"
        color="gray"
        icon={<CheckCircle />}
        disabled
      />
      <Button
        className={classes.button}
        label="Submit"
        color="gray"
        icon={<CheckCircle />}
        loading
      />
    </Row>
    <h2>Compact height</h2>
    <Row centered>
      <Button
        className={classes.button}
        label="Submit"
        color="blue"
        compactHeight
      />
      <Button
        className={classes.button}
        label="Submit"
        color="green"
        compactHeight
      />
      <Button
        className={classes.button}
        label="Submit"
        color="gray"
        compactHeight
      />
    </Row>
    <h2>IconButton</h2>
    <Row centered>
      <IconButton icon={<MoreHoriz />} />
      <IconButton icon={<MoreHoriz />} hover />
      <IconButton icon={<MoreHoriz />} active />
      <IconButton icon={<MoreHoriz />} disabled />
      <IconButton icon={<MoreHoriz />} loading />
    </Row>
    <Row centered>
      <IconButton icon={<MoreHoriz />} color="lightGreen" />
      <IconButton icon={<MoreHoriz />} color="lightGreen" hover />
      <IconButton icon={<MoreHoriz />} color="lightGreen" active />
      <IconButton icon={<MoreHoriz />} color="lightGreen" disabled />
      <IconButton icon={<MoreHoriz />} color="lightGreen" loading />
    </Row>
    <Row centered>
      <IconButton icon={<MoreHoriz />} color="lightBlue" />
      <IconButton icon={<MoreHoriz />} color="lightBlue" hover />
      <IconButton icon={<MoreHoriz />} color="lightBlue" active />
      <IconButton icon={<MoreHoriz />} color="lightBlue" disabled />
      <IconButton icon={<MoreHoriz />} color="lightBlue" loading />
    </Row>
    <h2>IconPlainButton</h2>
    <Row centered>
      <IconPlainButton icon={<MoreHoriz />} />
      <IconPlainButton icon={<MoreHoriz />} hover />
      <IconPlainButton icon={<MoreHoriz />} active />
      <IconPlainButton icon={<MoreHoriz />} disabled />
      <IconPlainButton icon={<MoreHoriz />} loading />
    </Row>
    <h1>BigButton</h1>
    <Row wide>
      <BigButton label="New story" />
    </Row>
    <Row wide>
      <BigButton label="New story" hover />
    </Row>
    <Row wide>
      <BigButton label="New story" active />
    </Row>
    <Row wide>
      <BigButton label="New story" disabled />
    </Row>
    <Row wide>
      <BigButton label="New story" loading />
    </Row>
    <Row wide>
      <BigButton label="No Icon" icon={null} />
    </Row>
    <h2>ToggleButton</h2>
    <Row>
      <ToggleButton label="Submit" icon={<ChatBubble />} />
      <ToggleButton
        defaultOn
        colorOn="green"
        label="Submit"
        icon={<ChatBubble />}
      />
      <ToggleButton.Icon icon={<MoreHoriz />} />
      <ToggleButton.Icon defaultOn colorOn="lightGreen" icon={<MoreHoriz />} />
    </Row>
    <PlainButtonsState>
      {({ larger, toggleLarger, hasIcon, toggleIcon }) => (
        <>
          <h2>TextButton</h2>
          <Row centered>
            <Checkbox
              checked={larger}
              onChange={toggleLarger}
              label="Larger"
              color="green"
            />
            <Checkbox
              checked={hasIcon}
              onChange={toggleIcon}
              label="Icon"
              color="green"
            />
          </Row>
          <Row>
            <TextButton
              icon={hasIcon && <Public />}
              larger={larger}
              label="Button"
            />
            <TextButton
              icon={hasIcon && <Public />}
              larger={larger}
              label="Button"
              hover
            />
            <TextButton
              icon={hasIcon && <Public />}
              larger={larger}
              label="Button"
              active
            />
            <TextButton
              icon={hasIcon && <Public />}
              larger={larger}
              label="Button"
              disabled
            />
            <TextButton
              icon={hasIcon && <Public />}
              larger={larger}
              label="Button"
              loading
            />
          </Row>
          <Row>
            <TextButton
              icon={hasIcon && <Public />}
              larger={larger}
              label="Button"
              color="blue"
            />
            <TextButton
              icon={hasIcon && <Public />}
              larger={larger}
              label="Button"
              color="blue"
              hover
            />
            <TextButton
              icon={hasIcon && <Public />}
              larger={larger}
              label="Button"
              color="blue"
              active
            />
            <TextButton
              icon={hasIcon && <Public />}
              larger={larger}
              label="Button"
              color="blue"
              disabled
            />
            <TextButton
              icon={hasIcon && <Public />}
              larger={larger}
              label="Button"
              color="blue"
              loading
            />
          </Row>
          <Row>
            <TextButton
              icon={hasIcon && <Public />}
              larger={larger}
              label="Button"
              color="gray"
            />
            <TextButton
              icon={hasIcon && <Public />}
              larger={larger}
              label="Button"
              color="gray"
              hover
            />
            <TextButton
              icon={hasIcon && <Public />}
              larger={larger}
              label="Button"
              color="gray"
              active
            />
            <TextButton
              icon={hasIcon && <Public />}
              larger={larger}
              label="Button"
              color="gray"
              disabled
            />
            <TextButton
              icon={hasIcon && <Public />}
              larger={larger}
              label="Button"
              color="gray"
              loading
            />
          </Row>
          <Row>
            <TextButton
              icon={hasIcon && <Public />}
              larger={larger}
              label="Button"
              color="faintGray"
            />
            <TextButton
              icon={hasIcon && <Public />}
              larger={larger}
              label="Button"
              color="faintGray"
              hover
            />
            <TextButton
              icon={hasIcon && <Public />}
              larger={larger}
              label="Button"
              color="faintGray"
              active
            />
            <TextButton
              icon={hasIcon && <Public />}
              larger={larger}
              label="Button"
              color="faintGray"
              disabled
            />
            <TextButton
              icon={hasIcon && <Public />}
              larger={larger}
              label="Button"
              color="faintGray"
              loading
            />
          </Row>
        </>
      )}
    </PlainButtonsState>

    <h2>Spinner</h2>
    <Row centered>
      <Spinner size={45} />
      <Spinner size={25} />
      <Spinner />
      <Spinner size={18} />
    </Row>
    <h2>SocialButton</h2>
    <Row centered>
      <SocialButton type="facebook" />
      <SocialButton type="facebook" hover />
      <SocialButton type="facebook" active />
    </Row>
    <Row centered>
      <SocialButton type="twitter" />
      <SocialButton type="twitter" hover />
      <SocialButton type="twitter" active />
    </Row>
    <Row centered>
      <SocialButton type="email" />
      <SocialButton type="email" hover />
      <SocialButton type="email" active />
    </Row>
    <Row centered>
      <SocialButton type="facebook" large />
      <SocialButton type="facebook" large hover />
      <SocialButton type="facebook" large active />
    </Row>
    <Row centered>
      <SocialButton type="twitter" large />
      <SocialButton type="twitter" large hover />
      <SocialButton type="twitter" large active />
    </Row>
    <Row centered>
      <SocialButton type="facebook" noLabel />
      <SocialButton type="twitter" noLabel />
      <SocialButton type="email" noLabel />
    </Row>
    <h2>Render button as Link</h2>
    <Row centered>
      <Button
        className={classes.button}
        label="Google.com"
        href="https://google.com"
        externalLink
        target="_blank"
      />
    </Row>
    <h2>Different Buttons</h2>
    <Row>
      <Button
        className={classes.button}
        label="Publish"
        color="green"
        icon={<Check />}
      />
      <Button
        className={classes.button}
        label="Discuss"
        icon={<ChatBubble />}
        counter={2}
      />
      <Button
        className={classes.button}
        label="Discuss"
        icon={<ChatBubble />}
        counter={99}
      />
      <Button label="839 similar payments" icon={<List />} />
    </Row>
  </Demo>
)

export default injectStyles(styles)(ButtonsDemo)
