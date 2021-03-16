const puppeteer = require('puppeteer')

module.exports = async (on, config) => {
  const browserFetcher = puppeteer.createBrowserFetcher()
  const revisions = await browserFetcher.localRevisions()
  if (revisions.length <= 0) {
    throw new Error('Could not find local browser')
  }
  const info = await browserFetcher.revisionInfo(revisions[0])
  console.log('found Chromium %o', info)

  const chromium = {
    name: 'chromium',
    family: 'chromium',
    displayName: 'Chromium',
    version: info.revision,
    majorVersion: info.revision,
    path: info.executablePath,
    channel: 'dev'
  }
  config.browsers.push(chromium)

  return config
}
