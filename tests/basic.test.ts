import Parameter from '../lib/parameter'
import Configuration from './../configuration'
import MoostoreJS from './../index'

let configuration: Configuration
let moostore: MoostoreJS

describe('test init object', () => {
  it('check configuration object', () => {
    const credentials = {
      username: '',
    }
    const baseURL = 'https://base-url.com'

    configuration = new Configuration({
      credentials,
      baseURL,
    })
    expect(configuration.getBaseURL()).toBe(baseURL)
    expect(configuration.getCredentials()).toBe(credentials)
  })

  it('check moostore object', () => {
    moostore = new MoostoreJS(configuration)

    expect(moostore).toHaveProperty('parameters')
    expect(moostore).toHaveProperty('configuration')
  })

  it('check parameter object', () => {
    const parameter = new Parameter

    parameter.set('foo', 'bar')
    expect(parameter.get('foo')).toMatch('bar')
    expect(parameter.has('foo')).toBeTruthy()

    const credentials = {
      username: 'user'
    }
    expect(parameter.get('credentials', credentials)).toBe(credentials)
  })
})
