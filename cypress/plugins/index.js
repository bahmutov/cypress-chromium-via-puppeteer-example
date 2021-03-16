const puppeteer = require('puppeteer')

module.exports = async (on, config) => {
  const browserFetcher = puppeteer.createBrowserFetcher()
  const revisions = await browserFetcher.localRevisions()
  if (revisions.length <= 0) {
    throw new Error('Could not find local browser')
  }
  const info = await browserFetcher.revisionInfo(revisions[0])
  console('found Chromium %o', info)

  return {
    browsers: [{
      path: info.executablePath
    }]
  }
}
