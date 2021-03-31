export default class Factory {
  services: object

  addService(serviceName: string, service: any) {
    const findService = this.getService(serviceName)

    if (!findService) {
      this.services = new Object
      this.services[serviceName] = service
    }
  }

  hasService(serviceName: string) {
    if (this.services && this.services[serviceName] !== undefined) {
      return true
    }
    return false
  }

  getService(serviceName: string) {
    if (this.hasService(serviceName)) {
      return this.services[serviceName]
    }

    return null
  }
}
