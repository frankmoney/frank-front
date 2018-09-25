// eslint-disable-next-line import/prefer-default-export
export const ROUTES = {
  root: '/',
  protectedArea: '/app',
  auth: {
    login: '/sign-in',
    recoverPassword: '/recover-password',
    logout: '/logout',
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
    match: '/team/:action?/:id?',
    invite: '/team/invite',
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

export const ACCOUNT_COOKIE_NAME = 'account-id'

export const BASE_TITLE = 'Frank'

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

export const DEFAULT_CATEGORIES = [
  {
    name: 'Certification',
    color: '#fde282',
  },
  {
    name: 'Taxes',
    color: '#ffb54c',
  },
  {
    name: 'Product development',
    color: '#3cd5c1',
  },
  {
    name: 'Product design',
    color: '#0aaddb',
  },
  {
    name: 'Fundraising events',
    color: '#00bd6a',
  },
  {
    name: 'Operating expenses',
    color: '#b259ad',
  },
  {
    name: 'Administrative expenses',
    color: '#0a70dd',
  },
]
export const TEAM_ROLE = {
  observer: 'observer',
  admin: 'administrator',
  manager: 'manager',
}

export const TEAM_ROLE_TEXT = {
  [TEAM_ROLE.observer]: 'Observer',
  [TEAM_ROLE.admin]: 'Administrator',
  [TEAM_ROLE.manager]: 'Manager',
}
