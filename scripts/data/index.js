#!/usr/bin/env node

'use strict'

const { enhanceFeed } = require('./enhance-feed')
const { generateIndexFile } = require('./latest-posts')
const { generateNewsFile } = require('./latest-news')
const { generateVideosFile } = require('./latest-videos')

// Enhance RSS feed first (adds release notes, ecosystem content, etc.)
// then generate index.json from the enhanced feed
enhanceFeed().then(() => {
  generateIndexFile()
  generateNewsFile()
  generateVideosFile()
})
