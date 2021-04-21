#!/usr/bin/env node

'use strict'

/**
 * Scheduled Publishing of posts and links.
 * This script checks for any blog posts and links that are scheduled to
 * be published, but are to be published today. If there is at least
 * one found, a build is trigged in fleek, updating the website
 * with the latest data.
 */

const fs = require('fs')
const path = require('path')

const pMap = require('p-map')
const matter = require('gray-matter')
const dayjs = require('dayjs')

const isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)

async function main() {
  // read files contents concurrently, 10 at a time
  const contentDir = path.resolve(__dirname, '../src/_blog')
  const files = await pMap(
    await fs.promises.readdir(contentDir),
    (filename) => {
      if (!filename.endsWith('.md')) {
        return null
      }

      return fs.promises.readFile(path.resolve(contentDir, filename), 'utf8')
    },
    { concurrency: 10 }
  )

  const output = files
    // exclude possible nulls
    .filter((result) => !!result)
    // process files into publishable items (posts or links)
    .reduce((items, fileContent) => {
      const metadata = matter(fileContent).data

      if (metadata.type && metadata.data) {
        // links
        items.push(...metadata.data)
      } else {
        items.push(metadata)
      }

      return items
    }, [])
    // check if there is at least one publish date in the future
    .some((item) => {
      let publishDate

      // blog post
      if (item.permalink) {
        publishDate = item.date
      }

      // links
      if (item.url && item.publish_date) {
        publishDate = item.publish_date
      }

      if (!publishDate) {
        return false
      }

      // we trim to the hour to avoid counting the initial delays on triggering
      // the job, which could cause the time calculations to exclude specific
      // scheduled dates and times.
      const now = dayjs(new Date()).startOf('hour')
      const timeMatch = dayjs(new Date(publishDate)).isBetween(
        now.subtract(12, 'hour'),
        now
      )

      // using stderr since stdout is used for GH workflow output
      if (timeMatch) {
        console.error(`Found post/link to publish: "${item.title}"`)
      }

      return timeMatch
    })

  if (!output) {
    console.error('Nothing found to publish.')
  }

  // output true or false: should trigger publish or not
  // GH Workflow step reads from stdout
  console.log(output)
}

main()
