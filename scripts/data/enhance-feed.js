'use strict'

/**
 * Enhances the RSS feed to include items from special content pages
 * (release notes, ecosystem content, etc.) that are stored as YAML
 * arrays in frontmatter rather than individual markdown files.
 */

const fs = require('fs')
const path = require('path')
const xml2js = require('xml2js')
const matter = require('gray-matter')
const dayjs = require('dayjs')

const xmlFilePath = 'dist/index.xml'

// Only include items published after this date (to avoid backfilling old content)
const CUTOFF_DATE = dayjs('2025-11-25')

// Content types to include in the unified feed
// Each item in the data array should have: title, date, path (URL)
const CONTENT_SOURCES = [
  { file: 'releasenotes.md', category: 'Release Notes' },
  { file: 'ecosystemcontent.md', category: 'Ecosystem' },
  { file: 'newscoverage.md', category: 'News Coverage' },
  { file: 'videos.md', category: 'Videos' },
  { file: 'tutorials.md', category: 'Tutorials' },
  { file: 'events.md', category: 'Events' },
]

function parseContentFile(filename) {
  const filepath = path.resolve('src/_blog', filename)
  try {
    const content = fs.readFileSync(filepath, 'utf8')
    const { data } = matter(content)
    const now = dayjs()
    return (data.data || []).filter((item) => {
      if (item.hidden) return false
      if (item.publish_date && dayjs(item.publish_date).isAfter(now)) return false
      return dayjs(item.publish_date || item.date).isAfter(CUTOFF_DATE)
    })
  } catch (err) {
    console.error(`Warning: Could not read ${filename}:`, err.message)
    return []
  }
}

function itemToRssEntry(item, category) {
  return {
    title: [item.title],
    link: [item.path],
    pubDate: [dayjs(item.date).toDate().toUTCString()],
    description: [item.title],
    category: [category],
    guid: [{ _: item.path, $: { isPermaLink: 'true' } }],
  }
}

async function enhanceFeed() {
  let xmlData, parsed
  try {
    xmlData = fs.readFileSync(xmlFilePath, 'utf8')
    parsed = await xml2js.parseStringPromise(xmlData)
  } catch (err) {
    console.error('Could not read/parse RSS feed:', err.message)
    process.exit(1)
  }

  // Blog posts link to the blog domain, special content links externally
  const blogDomain = parsed.rss.channel[0].link[0]
  const existingItems = (parsed.rss.channel[0].item || []).filter(
    (item) => item.link[0].startsWith(blogDomain)
  )

  // Parse special content and convert to RSS items
  const additionalItems = CONTENT_SOURCES.flatMap((source) =>
    parseContentFile(source.file).map((i) => itemToRssEntry(i, source.category))
  )

  // Deduplicate by guid
  const seen = new Set()
  const allItems = [...existingItems, ...additionalItems]
    .filter((item) => {
      const guid = item.guid?.[0]?._ || item.guid?.[0] || item.link[0]
      return !seen.has(guid) && seen.add(guid)
    })
    .sort((a, b) => new Date(b.pubDate[0]) - new Date(a.pubDate[0]))

  parsed.rss.channel[0].item = allItems

  const builder = new xml2js.Builder({ xmldec: { version: '1.0', encoding: 'UTF-8' } })
  fs.writeFileSync(xmlFilePath, builder.buildObject(parsed))
  console.log(`Enhanced RSS feed: ${allItems.length} items (${existingItems.length} posts + ${additionalItems.length} special)`)
}

exports.enhanceFeed = enhanceFeed
