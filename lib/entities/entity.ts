export default class Entity {
  constructor(data:object) {
    this.applyData(data)
  }

  applyData(data: object) {
    /* Object.keys(data).forEach(key => {
      this[key] = data[key]
    }) */

    Object.assign(this, data)

    return this
  }
}