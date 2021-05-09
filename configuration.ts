export default class Configuration {
  protected credentials: object
  protected baseURL: string
  protected userAgent: string
  protected cachePath: string

  constructor(configuration: object) {
    this.credentials = configuration['credentials']
    this.baseURL = configuration['baseURL']

    if (configuration['userAgent']) {
      this.userAgent = configuration['userAgent']
    }

    if (configuration['cachePath']) {
      this.cachePath = configuration['cachePath']
    }
  }

  public getCredentials() {
    return this.credentials
  }

  public getBaseURL() {
    return this.baseURL
  }

  public getUserAgent() {
    return this.userAgent
  }

  public useCache() {
    if (this.cachePath) {
      return true
    }
    return false
  }

  public getCachePath() {
    return this.cachePath
  }
}
