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
  stories: {
    root: '/stories',
    storyPreview: '/story/:id?',
    storyEdit: '/story/:id?/edit',
    storyNew: '/story/new',
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

export const UI_FLAGS = {
  // UX Design: Every time after user (moderator) publish story, after redirect
  // to stories page - share dialog should be shown
  lastPublishedStoryUrl: 'ui/lastPublishedStoryUrl',
}

export const BASE_TITLE = 'Frank'

export const UNCATEGORIZED_COLOR = 'rgb(211, 213, 217)'
