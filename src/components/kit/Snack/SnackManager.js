export default class SnackManager {
  #list = []

  async changeList(newList, cb) {
    this.#list = newList
    await Promise.all(
      newList.map(
        (snack, idx) => new Promise(resolve => snack.changeOrder(idx, resolve))
      )
    )

    if (typeof cb === 'function') {
      cb()
    }
  }

  add(snack, cb) {
    this.changeList([...this.#list, snack], cb)
  }

  remove(snack, cb) {
    this.changeList(this.#list.filter(x => x !== snack), cb)
  }
}
