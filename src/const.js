// eslint-disable-next-line import/prefer-default-export
export const ROUTES = {
  root: '/',
  protectedArea: '/app',
  auth: {
    login: '/sign-in',
    recoverPassword: '/recover-password',
    logout: '/logout',
  },
  manage: {
    inbox: {
      root: '/manage/inbox',
    },
    ledger: {
      root: '/manage/ledger',
    },
    stories: {
      root: '/manage/stories',
      storyPreview: '/manage/story/:id?',
      storyEdit: '/manage/story/:id?/edit',
      storyNew: '/manage/story/new',
    },
    directory: {
      root: '/manage/directory',
      recipient: '/manage/directory/:id?',
    },
    team: {
      root: '/manage/team',
    },
    onboarding: {
      root: '/onboarding',
    },
  },
  public: {
    ledger: {
      idRoot: '/account/:accountId?',
      idRootTab: '/account/:accountId/:tab(stories)?',
      stories: '/account/:accountId?/stories',
    },
    story: {
      root: '/account/:accountId?/stories/:storyId?',
    },
    payment: {
      root: '/account/:accountId?/payments/:paymentId?',
    },
  },
  demo: {
    root: '/demo',
    cards: '/demo/cards',
    comments: '/demo/comments',
    components: '/demo/components',
    buttons: '/demo/buttons',
    fields: '/demo/fields',
    popups: '/demo/popups',
    selectLists: '/demo/select-lists',
    selects: '/demo/selects',
    dialogs: '/demo/dialogs',
    drawers: '/demo/drawers',
    switches: '/demo/switches',
    widgets: '/demo/widgets',
  },
}

export const LS_FLAGS = {
  // UX Design: Every time after user (moderator) publish story, after redirect
  // to stories page - share dialog should be shown
  lastPublishedStoryUrl: 'ui/lastPublishedStoryUrl',
  onboardingTermsAccepted: 'onboarding/terms-accepted',
}

export const ACCOUNT_COOKIE_NAME = 'account-id'

export const BASE_TITLE = 'Frank'

export const TEAM_ROLES = {
  administrator: 'administrator',
  manager: 'manager',
  observer: 'observer',
}

export const TEAM_ROLE_TITLES = {
  [TEAM_ROLES.administrator]: 'Administrator',
  [TEAM_ROLES.manager]: 'Manager',
  [TEAM_ROLES.observer]: 'Observer',
}

export const ORDERED_TEAM_ROLES = [
  TEAM_ROLES.administrator,
  TEAM_ROLES.manager,
  TEAM_ROLES.observer,
]

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
