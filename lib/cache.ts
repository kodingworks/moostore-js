import * as fs from 'fs'
import { readdir } from 'fs/promises'
import Configuration from '../configuration'
import * as crypto from 'crypto'

export default class Cache {
  protected configuration: Configuration

  constructor(configuration: Configuration) {
    this.configuration = configuration

    if (this.configuration.useCache()) {
      if ( false === (
        fs.existsSync(this.configuration.getCachePath())
        && fs.lstatSync(this.configuration.getCachePath()).isDirectory()
      ) ) {
        fs.mkdirSync(this.configuration.getCachePath())
      }
    }
  }

  hashCacheKey(cacheKey: string) {
    return crypto.createHash('sha256').update(cacheKey, 'binary').digest('hex')
  }

  async all() {
    if (this.configuration.useCache() === false) {
      return []
    }
    const files = await readdir(this.configuration.getCachePath())
  }

  async get(key: string, defaultValue?: any) {
    if (defaultValue === undefined) {
      defaultValue = null
    }

    // get key hash
    key = this.hashCacheKey(key)

    const filePath = this.configuration.getCachePath() + '/' + key

    console.log('CACHE: getting cache with key ', filePath)

    if (! fs.existsSync(filePath)) {
      return defaultValue
    }

    let content: any = await fs.readFileSync(filePath)

    const buffer = Buffer.from(content)

    if (buffer.toString.length > 0) {
      content = buffer.toString()
    }

    if (buffer.toString().length < 1) {
      content = defaultValue
    }

    return content
  }

  async put(key: string, value: any) {
    // get key hash
    key = this.hashCacheKey(key)

    const filePath = this.configuration.getCachePath() + '/' + key

    console.log('CACHE: writing cache to ', filePath)

    await fs.writeFile(filePath, value, (err) => {
      console.log('CACHE: writing file err ', err)
    })
  }

  async forget(key: string) {
    // get key hash
    key = this.hashCacheKey(key)

    const filePath = this.configuration.getCachePath() + '/' + key
    fs.unlink(filePath, () => {})
  }
}
