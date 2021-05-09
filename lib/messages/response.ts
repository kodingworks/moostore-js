const cheerio = require('cheerio')

export default class Response {
  data: any

  setData(data: any) {
    this.data = data
  }

  getData() {
    return this.data
  }

  parseHTML(html: string) {
    return cheerio.load(html, null, false)
  }
}
