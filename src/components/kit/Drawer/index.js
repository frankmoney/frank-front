import Drawer from './Drawer'
import DrawerState from './DrawerState'
import DrawerPaper from './DrawerPaper'
import DrawerTitle from './DrawerTitle'
import DrawerContent from './DrawerContent'
import DrawerMaximizeButton from './DrawerMaximizeButton'
import DrawerFooter from './DrawerFooter'
import DrawerField from './DrawerField'
import DrawerHeadButton from './DrawerHeadButton'
import DrawerCloseButton from './DrawerCloseButton'
import context from './context'

Drawer.Paper = DrawerPaper
Drawer.State = DrawerState
Drawer.Title = DrawerTitle
Drawer.Content = DrawerContent
Drawer.Footer = DrawerFooter
Drawer.Field = DrawerField
Drawer.HeadButton = DrawerHeadButton
Drawer.CloseButton = DrawerCloseButton
Drawer.MaximizeButton = DrawerMaximizeButton
Drawer.Consumer = context.Consumer
Drawer.Provider = context.Provider

export default Drawer

export type { DrawerContextType } from './context'
export type { DrawerProps } from './Drawer'
