import React from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form/immutable'

const store = createStore(combineReducers({ form: formReducer }))

const FormsReduxProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
)

export default FormsReduxProvider
