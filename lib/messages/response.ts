const cheerio = require('cheerio')

export default class Response {
  data: any
s
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
