#!/usr/bin/env node

'use strict'

const { generateIndexFile } = require('./latest-posts')
const { generateNewsFile } = require('./latest-news')
const { generateVideosFile } = require('./latest-videos')

generateIndexFile()
generateNewsFile()
generateVideosFile()
