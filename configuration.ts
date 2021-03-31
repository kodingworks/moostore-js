export default class Configuration {
  protected credentials: object
  protected baseURL: String

  constructor(configuration: object) {
    this.credentials = configuration["credentials"]
    this.baseURL = configuration["baseURL"]
  }

  public getCredentials() {
    return this.credentials
  }

  public getBaseURL() {
    return this.baseURL
  }
}
