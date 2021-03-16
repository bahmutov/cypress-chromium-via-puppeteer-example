const puppeteer = require('puppeteer')

module.exports = async (on, config) => {
  const browserFetcher = puppeteer.createBrowserFetcher()
  const revisions = await browserFetcher.localRevisions()
  if (revisions.length <= 0) {
    console.error('Could not find local Chromium browser')
    // still use the local browsers
    return
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
