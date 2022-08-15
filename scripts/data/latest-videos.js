'use strict'

/**
    The ipfs.io website requests for a blog.ipfs.tech/videos.json file
    with the latest 2 videos.
*/

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const dayjs = require('dayjs')

const jsonFilePath = 'dist/videos.json'

exports.generateVideosFile = () => {
  const contentDir = path.resolve('src/_blog')
  fs.readFile(path.resolve(contentDir, 'videos.md'), 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const videos = matter(data)
      .data.data.sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 2)

    const videosFormatted = videos.map((entry) => ({
      title: entry.title,
      date: dayjs(entry.date).format('D MMM YYYY'),
      url: entry.path,
      thumbnail: `https://img.youtube.com/vi/${
        new URL(entry.path).searchParams.get('v') ||
        new URL(entry.path).searchParams.get('list')
      }/maxresdefault.jpg`,
    }))

    fs.writeFile(
      jsonFilePath,
      JSON.stringify({ videos: videosFormatted }),
      (error) => {
        if (error) {
          console.error(error)
          return process.exit(1)
        }
      }
    )
  })
}
