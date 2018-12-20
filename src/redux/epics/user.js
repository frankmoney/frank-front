import { updateUser, currentUserSelector } from '@frankmoney/webapp'
import { addAccount } from 'redux/actions/user'

export const addAccountEpic = (action$, store) =>
  action$.ofType(addAccount).map(({ payload: account }) => {
    const user = currentUserSelector(store.getState())
    return updateUser.success({
      ...user,
      accounts: [...user.accounts, account],
    })
  })
