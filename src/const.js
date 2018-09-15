import { OrderedMap } from 'immutable'

// eslint-disable-next-line import/prefer-default-export
export const ROUTES = {
  root: '/',
  protectedArea: '/app',
  auth: {
    login: '/sign-in',
    recoverPassword: '/recover-password',
    logout: '/sign-out',
  },
  inbox: {
    root: '/inbox',
  },
  ledger: {
    root: '/ledger',
  },
  directory: {
    root: '/directory',
    recipient: '/directory/:id?',
  },
  team: {
    root: '/team',
  },
  onboarding: {
    root: '/onboarding',
  },
  demo: {
    root: '/demo',
    cards: '/demo/cards',
    comments: '/demo/comments',
    components: '/demo/components',
    drawers: {
      root: '/demo/drawers',
      parameterized: '/demo/drawers/:type?',
      type1: '/demo/drawers/type-1',
      type2: '/demo/drawers/type-2',
      type3: '/demo/drawers/type-3',
      type4: '/demo/drawers/type-4',
    },
    widgets: '/demo/widgets',
  },
}

export const BASE_TITLE = 'Frank'

export const ROLES = OrderedMap(
  [
    { role: 'administrator', title: 'Administrator' },
    { role: 'manager', title: 'Manager' },
    { role: 'observer', title: 'Observer' },
  ].map(item => [item.role, item])
)

export const UNCATEGORIZED_COLOR = 'rgb(211, 213, 217)'

export const CATEGORY_COLORS = {
  '#3240A8': 'Navy Blue',
  '#8725FB': 'Purple',
  '#FF27A9': 'Pink',
  '#EE4542': 'Red',
  '#FF7970': 'Coral',
  '#FF8F00': 'Orange',
  '#F2B90E': 'Yellow',
  '#95D832': 'Lime Green',
  '#14D3DF': 'Turquoise',
  '#000000': 'Black',
  '#574D43': 'Brown',
  '#CAB268': 'Sorrell Brown',
}
