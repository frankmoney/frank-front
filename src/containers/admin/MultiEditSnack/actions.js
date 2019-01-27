import createActions from 'utils/createActions'

export default createActions('multi-edit', {
  add: false,
  remove: false,
  clear: false,
  beginEdit: false,
  cancelEdit: false,
  save: false,
  saveAndPublish: false,
  changePublish: false,
  cancelChangePublish: false,
  confirmChangePublish: false,
  updateFail: false,
  updateSuccess: false,
  startLeave: false,
  leave: false,
})
