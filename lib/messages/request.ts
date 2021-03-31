import * as puppeteer from 'puppeteer'
import { Browser } from 'puppeteer'
import Configuration from '../../configuration'

export default class Request {
  url: string
  browser: Browser
  configuration: Configuration

  constructor(configuration: Configuration) {
    this.configuration = configuration
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

  /**
   * Send request and return the requested page
   * @returns string
   */
  async getPage() {
    const url = this.getURL()

    try {
      // open new page on current active browser
      const browser = await this.getBrowser()
      const page = await browser.newPage()

      // set request intercept
      // it important for perfomance issue
      // abort every unused resource
      await page.setRequestInterception(true)
      page.on('request', (intercepedRequest) => {
        let abort = false
        if (intercepedRequest.resourceType() === 'image'
          || intercepedRequest.resourceType() === 'font'
          || intercepedRequest.resourceType() === 'stylesheet'
          || intercepedRequest.resourceType() === 'media'
        ) {
          abort = true
        }

        if (abort) {
          intercepedRequest.abort()
        } else {
          intercepedRequest.continue()
        }
      })

      // set user agent,
      // we use mobile agent
      // to get most simple version of the site
      page.setUserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
      )
      page.setDefaultTimeout(0)

      // navigate to page
      await page.goto(url)
      // await page.waitForNavigation()

      // get page content
      const content = await page.content()

      // close current active browser
      this.closeBrowser()

      return content
    } catch (err) {
      throw err
    }
  }
}
