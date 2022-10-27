'use strict'

/**
    The ipfs.io website requests for a blog.ipfs.tech/index.json file
    with the latest 4 posts.
    This script parses the rss feed file index.xml and generates the
    required index.json file.

    @see https://github.com/ipfs/ipfs-blog/issues/104
*/

const fs = require('fs')
const xml2js = require('xml2js')
const dayjs = require('dayjs')

const xmlFilePath = 'dist/index.xml'
const jsonFilePath = 'dist/index.json'

function generateJsonFile(xml) {
  xml2js.parseString(xml, (error, dataObj) => {
    if (error) {
      console.error(error)
      return process.exit(1)
    }

    const posts = dataObj.rss.channel[0].item.slice(0, 4).map((item) => ({
      title: item.title[0],
      date: dayjs(item.pubDate[0]).format('DD MMMM YYYY'),
      url: item.link[0],
      author: '',
    }))

    fs.writeFile(jsonFilePath, JSON.stringify({ posts }), (error) => {
      if (error) {
        console.error(error)
        return process.exit(1)
      }
    })
  })
}

exports.generateIndexFile = () => {
  fs.readFile(xmlFilePath, { encoding: 'utf-8' }, (error, data) => {
    if (error) {
      console.error(error)

      if (error.code === 'ENOENT') {
        console.error(
          "rss xml file not found – couldn't generate the index.json file."
        )
      }

      return process.exit(1)
    }

    generateJsonFile(data)
  })
}
