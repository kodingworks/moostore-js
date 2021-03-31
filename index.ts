import Configuration from "./configuration"
import Parameter from "./lib/parameter"

export default class MoostoreJS {
  configuration: Configuration
  parameters: Parameter

  constructor(configuration?: Configuration) {
    this.configuration = configuration

    this.setUp()
  }

  setUp(): void {
    if (!this.parameters) {
      this.parameters = new Parameter()
    }
  }

  getDefaultConfiguration() {
    return new Configuration({})
  }

  getConfiguration() {
    if (! this.configuration) {
      this.configuration = this.getConfiguration()
    }

    return this.configuration
  }

  getParameters() {
    if (!this.parameters) {
      this.parameters = new Parameter()
    }

    return this.parameters
  }
}
