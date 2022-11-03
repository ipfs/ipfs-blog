'use strict'

/**
    The ipfs.io website requests for a blog.ipfs.tech/news.json file
    with the latest 3 news.
*/

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const dayjs = require('dayjs')

const jsonFilePath = 'dist/news.json'

exports.generateNewsFile = () => {
  const contentDir = path.resolve('src/_blog')
  fs.readFile(
    path.resolve(contentDir, 'newscoverage.md'),
    'utf8',
    (err, data) => {
      if (err) {
        console.error(err)
        return
      }

      const news = matter(data)
        .data.data.sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3)

      const newsFormatted = news.map((entry) => ({
        title: entry.title,
        date: dayjs(entry.date).format('D MMM YYYY'),
        url: entry.path,
      }))

      fs.writeFile(
        jsonFilePath,
        JSON.stringify({ news: newsFormatted }),
        (error) => {
          if (error) {
            console.error(error)
            return process.exit(1)
          }
        }
      )
    }
  )
}
