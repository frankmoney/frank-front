// @flow strict
export const ROUTES = {
  root: '/',
  protectedArea: '/app',
  auth: {
    login: '/sign-in',
    register: '/sign-up',
    recoverPassword: '/recover-password',
    recoverPasswordMailSent: '/recover-password/success',
    resetPassword: '/reset-password/:token',
    logout: '/logout',
  },
  account: {
    root: '/accounts',
    onboarding: '/accounts/new',
    idRoot: '/accounts/:accountId?',
    idRootTab: '/accounts/:accountId/:tab(stories)?',
    stories: {
      root: '/accounts/:accountId?/stories',
      idRoot: '/accounts/:accountId?/stories/:storyId?',
      idRootEdit: '/accounts/:accountId?/stories/:storyId?/edit',
      idRootNew: '/accounts/:accountId?/stories/new',
    },
    inbox: {
      root: '/accounts/:accountId/inbox',
    },
    directory: {
      root: '/accounts/:accountId/directory',
      recipient: '/accounts/:accountId/directory/:id?',
    },
    payment: {
      idRoot: '/accounts/:accountId?/payments/:paymentId?',
    },
    settings: {
      root: '/accounts/:accountId/settings',
    },
  },
  team: {
    root: '/team',
  },
  demo: {
    root: '/demo',
    cards: '/demo/cards',
    comments: '/demo/comments',
    components: '/demo/components',
    buttons: '/demo/buttons',
    fields: '/demo/fields',
    fieldsLeft: '/demo/fields-left',
    popups: '/demo/popups',
    selectLists: '/demo/select-lists',
    selects: '/demo/selects',
    selectsDate: '/demo/selects-date',
    dialogs: '/demo/dialogs',
    drawers: '/demo/drawers',
    switches: '/demo/switches',
    widgets: '/demo/widgets',
    forms: '/demo/forms',
    palette: '/demo/palette',
    snacks: '/demo/snacks',
  },
}

export const LS_FLAGS = {
  // UX Design: Every time after user (moderator) publish story, after redirect
  // to stories page - share dialog should be shown
  lastPublishedStoryUrl: 'ui/lastPublishedStoryUrl',
  onboardingTermsAccepted: 'onboarding/terms-accepted',
}

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

export const UNCATEGORIZED_COLOR = 'rgba(37,43,67,0.2)'

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

export const CATEGORY_PALETTE = [
  ['#FFDD5B', '#FED432', '#FBBA28', '#F68618'],
  ['#C88F58', '#9E7147', '#815328', '#703D0D'],
  ['#F15D59', '#E64238', '#DB382F', '#C22222'],
  ['#E73E79', '#D21D62', '#C11859', '#8E1050'],
  ['#A946BA', '#8E25A6', '#7A1D9F', '#4D168D'],
  ['#7C57C1', '#5F35B1', '#512DA7', '#331C91'],
  ['#43A0F0', '#1E85E1', '#1972CE', '#015CA2'],
]

export const DEFAULT_CATEGORIES = [
  {
    name: 'Program expenses',
    color: '#8725FB',
  },
  {
    name: 'Administration',
    color: '#0a70dd',
  },
  {
    name: 'Fundraising',
    color: '#ffb54c',
  },
]

export const DEFAULT_INCOME_CATEGORIES = [
  {
    name: 'Contributions',
    color: '#21CB61',
  },
  {
    name: 'Grants',
    color: '#049371',
  },
  {
    name: 'Program services',
    color: '#049371',
  },
  {
    name: 'Investments',
    color: '#049371',
  },
  {
    name: 'Special events',
    color: '#049371',
  },
  {
    name: 'Sales',
    color: '#049371',
  },
]

export const UNCATEGORIZED_CATEGORY = {
  id: '#UNCATEGORIZED',
  name: 'Uncategorized',
  color: UNCATEGORIZED_COLOR,
}
