import { createSelector } from 'reselect'

export const ownProfileSelector = () => ({
  id: '59',
  admin: true,
  canInvite: true,
  lastName: 'Liberman',
  firstName: 'Gabriel',
  email: 'gabriel@frank.ly',
  avatar: {
    preview:
      'https://lh3.googleusercontent.com/-bqHQEeGxAtk/AAAAAAAAAAA/AAAAAAAAAAA/YzjylD2AqGo/s64-c/117896702823845180946.jpg?size=80',
    original:
      'https://lh3.googleusercontent.com/-bqHQEeGxAtk/AAAAAAAAAAA/AAAAAAAAAAA/YzjylD2AqGo/s64-c/117896702823845180946.jpg?size=500',
  },
  access: ['1', '2', '3', '4', '5'],
  acl: {
    remove: true,
    editRole: false,
    changeAvatar: true,
    editProfile: true,
    changePassword: true,
  },
})

export const otherProfilesSelector = () => [
  {
    id: '58',
    admin: true,
    canInvite: false,
    avatar: null,
    email: 'apetrova+second@frank.ly',
    lastName: 'Petrova',
    firstName: 'Nastya',
    access: ['1', '2', '3', '4', '5'],
    acl: {
      remove: true,
      editRole: true,
      changeAvatar: false,
      editProfile: false,
      changePassword: false,
    },
  },
  {
    id: '57',
    admin: true,
    canInvite: false,
    avatar: {
      preview:
        'https://lh3.googleusercontent.com/-r49iMCIaK6c/AAAAAAAAAAA/AAAAAAAAAAA/xhmOkc3-sOs/s64-c/117919324211839657069.jpg?size=80',
      original:
        'https://lh3.googleusercontent.com/-r49iMCIaK6c/AAAAAAAAAAA/AAAAAAAAAAA/xhmOkc3-sOs/s64-c/117919324211839657069.jpg?size=500',
    },
    email: 'sp@frank.ly',
    lastName: 'Parshukov',
    firstName: 'Sergey',
    access: ['1', '3'],
    acl: {
      remove: true,
      editRole: true,
      changeAvatar: false,
      editProfile: false,
      changePassword: false,
    },
  },
  {
    id: '56',
    admin: true,
    canInvite: true,
    avatar: {
      preview:
        'https://lh3.googleusercontent.com/-6P-Vv1RvnMI/AAAAAAAAAAI/AAAAAAAAAAA/sHA3blhwHKM/s64-c/109038176181511753495.jpg?size=80',
      original:
        'https://lh3.googleusercontent.com/-6P-Vv1RvnMI/AAAAAAAAAAI/AAAAAAAAAAA/sHA3blhwHKM/s64-c/109038176181511753495.jpg?size=500',
    },
    email: 'tom@frank.ly',
    lastName: 'Kazakov',
    firstName: 'Tom',
    access: ['1', '2', '3', '4', '5'],
    acl: {
      remove: true,
      editRole: true,
      changeAvatar: false,
      editProfile: false,
      changePassword: false,
    },
  },
  {
    id: '55',
    admin: false,
    canInvite: true,
    avatar: null,
    email: 'ilya.k@frank.ly',
    lastName: 'Kozlov',
    firstName: 'Ilya',
    access: ['5'],
    acl: {
      remove: true,
      editRole: true,
      changeAvatar: false,
      editProfile: false,
      changePassword: false,
    },
  },
  {
    id: '54',
    admin: true,
    canInvite: true,
    avatar: {
      preview:
        'https://lh3.googleusercontent.com/-gjoVUFloyzM/AAAAAAAAAAA/AAAAAAAAAAA/JWMnoJkqnjM/s64-c/118331485342587094512.jpg?size=80',
      original:
        'https://lh3.googleusercontent.com/-gjoVUFloyzM/AAAAAAAAAAA/AAAAAAAAAAA/JWMnoJkqnjM/s64-c/118331485342587094512.jpg?size=500',
    },
    email: 'nick@frank.money',
    lastName: 'Delitski',
    firstName: 'Nick',
    access: ['3', '4', '5'],
    acl: {
      remove: true,
      editRole: true,
      changeAvatar: false,
      editProfile: false,
      changePassword: false,
    },
  },
  {
    id: '52',
    admin: true,
    canInvite: true,
    avatar: {
      preview:
        'https://lh3.googleusercontent.com/-0iA8XmSnxw0/AAAAAAAAAAA/AAAAAAAAAAA/1ZDzzjGNqt0/s64-c/100984699143815889583.jpg?size=80',
      original:
        'https://lh3.googleusercontent.com/-0iA8XmSnxw0/AAAAAAAAAAA/AAAAAAAAAAA/1ZDzzjGNqt0/s64-c/100984699143815889583.jpg?size=500',
    },
    email: 'rinat@frank.money',
    lastName: 'Murtazin',
    firstName: 'Rinat',
    access: ['1', '2', '3', '4', '5'],
    acl: {
      remove: true,
      editRole: true,
      changeAvatar: false,
      editProfile: false,
      changePassword: false,
    },
  },
  {
    id: '51',
    admin: false,
    canInvite: false,
    avatar: {
      preview: 'https://randomuser.me/api/portraits/med/men/21.jpg',
      original: 'https://randomuser.me/api/portraits/men/21.jpg',
    },
    email: 'harley.wilson@example.com',
    lastName: 'Wilson',
    firstName: 'Harley',
    access: ['1', '2', '3', '4', '5'],
    acl: {
      remove: true,
      editRole: true,
      changeAvatar: false,
      editProfile: false,
      changePassword: false,
    },
  },
  {
    id: '50',
    admin: false,
    canInvite: false,
    avatar: {
      preview: 'https://randomuser.me/api/portraits/med/women/4.jpg',
      original: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    email: 'jandira.lima@example.com',
    lastName: 'Lima',
    firstName: 'Jandira',
    access: ['2', '3'],
    acl: {
      remove: true,
      editRole: true,
      changeAvatar: false,
      editProfile: false,
      changePassword: false,
    },
  },
  {
    id: '49',
    admin: false,
    canInvite: false,
    avatar: {
      preview: 'https://randomuser.me/api/portraits/med/women/41.jpg',
      original: 'https://randomuser.me/api/portraits/women/41.jpg',
    },
    email: 'henriette.gärtner@example.com',
    lastName: 'Gärtner',
    firstName: 'Henriette',
    access: [],
    acl: {
      remove: true,
      editRole: true,
      changeAvatar: false,
      editProfile: false,
      changePassword: false,
    },
  },
]

export const canInviteSelector = createSelector(
  ownProfileSelector,
  ({ canInvite }) => canInvite
)
