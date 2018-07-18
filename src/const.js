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
  team: {
    root: '/team',
    match: '/team/:action?/:id?',
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
  },
}

export const DEFAULT_TITLE = 'Frank'
