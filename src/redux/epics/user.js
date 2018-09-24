import { updateUser, currentUserSelector } from '@frankmoney/webapp'
import cookies from 'browser-cookies'
import { selectAccount, addAccount } from 'redux/actions/user'
import { ACCOUNT_COOKIE_NAME } from '../../const'

export const selectAccountEpic = (action$, store) =>
  action$.ofType(selectAccount).map(({ payload: id }) => {
    cookies.set(ACCOUNT_COOKIE_NAME, id)
    return updateUser.success({
      ...currentUserSelector(store.getState()),
      accountId: id,
    })
  })

export const addAccountEpic = (action$, store) =>
  action$.ofType(addAccount).map(({ payload: account }) => {
    const user = currentUserSelector(store.getState())
    return updateUser.success({
      ...user,
      accounts: [...user.accounts, account],
    })
  })
