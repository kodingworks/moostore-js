export default class Parameter {
  parameters: object

  constructor(parameters?: object) {
    this.parameters = new Object

    if (parameters) {
      this.parameters = parameters
    }
  }

  all() {
    return this.parameters
  }

  get(key: string, defaultValue?: any) {
    if (this.has(key)) {
      return this.parameters[key]
    }

    return defaultValue
  }

  set(key: string, value: any) {
    this.parameters[key] = value
  }

  has(key: string) {
    if (this.parameters[key] !== undefined) {
      return true
    }

    return false
  }
}
