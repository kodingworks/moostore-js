import * as puppeteer from 'puppeteer'
import { Browser } from 'puppeteer'
import Configuration from '../../configuration'
import Cache from '../cache'

export default class Request {
  url: string
  browser: Browser
  configuration: Configuration
  cache: Cache

  interceptRequests: Array<String> = ['font', 'stylesheet', 'media']

  constructor(configuration: Configuration) {
    this.configuration = configuration

    if (configuration.useCache()) {
      this.cache = new Cache(configuration)
    }
  }

  /**
   * get browser instance
   * @returns Browser
   */
  async getBrowser() {
    if (!(this.browser && this.browser instanceof Browser)) {
      try {
        const browser = await puppeteer.launch({
          headless: false
        })
        this.browser = browser
      } catch (err) {
        console.log('Request getBrowser: ', err)
      }
    }

    return this.browser
  }

  /**
   * Close current opened browser
   */
  closeBrowser() {
    try {
      this.browser.close()

      this.browser = null
    } catch (err) {}
  }

  /**
   * Get requested url
   * @returns string
   */
  getURL(): string {
    return this.url
  }

  /**
   * Get request params
   * @returns object
   */
  getData(): object {
    return {}
  }

  async preRequestCallback(page: any): Promise<any> {
    return {}
  }

  async postRequestCallback(page: any): Promise<any> {
    return {}
  }

  /**
   * Send request and return the requested page
   * @returns string
   */
  async getPage() {
    const url = this.getURL()

    const cacheKey = this.getURL().replace('https://', '')

    try {
      // check if cache is active, return cache data immediately
      if (this.configuration.useCache()) {
        let cacheData = await this.cache.get(cacheKey)
        if (cacheData !== null && cacheData !== undefined && cacheData.toString().length > 0) {
          return cacheData
        }
        console.log('Cache', cacheData)
      }

      // open new page on current active browser
      const browser = await this.getBrowser()
      const page = await browser.newPage()

      // set request intercept
      // it important for perfomance issue
      // abort every unused resource
      await page.setRequestInterception(true)

      console.log('InterceptRequest', this.interceptRequests)

      page.on('request', (interceptedRequest) => {
        let abort = false
        if (this.interceptRequests.indexOf(interceptedRequest.resourceType()) >= 0) {
          abort = true
        }

        if (abort) {
          interceptedRequest.abort()
        } else {
          interceptedRequest.continue()
        }
      })

      // set user agent,
      // we use mobile agent
      // to get most simple version of the site
      const userAgent: string = this.configuration && this.configuration.getUserAgent()
        ? this.configuration.getUserAgent()
        : 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
      page.setUserAgent(userAgent)
      page.setDefaultTimeout(0)

      // enable browser page cache
      if (this.configuration.useCache()) {
        page.setCacheEnabled(true)
      }

      this.preRequestCallback(page)

      // console.log('Request', page)

      // navigate to page
      await page.goto(url)
      // await page.waitForNavigation()

      await this.postRequestCallback(page)

      // get page content
      const content = await page.content()

      // close current active browser
      this.closeBrowser()

      // store cache
      if (this.configuration.useCache()) {
        this.cache.put(cacheKey, content)
      }

      return content
    } catch (err) {
      throw err
    }
  }
}
