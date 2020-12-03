export const getTags = (posts) => {
  const tags = []

  posts.forEach((post) => {
    const postTags = post.frontmatter.tags.replaceAll(', ', ',').split(',')

    for (let i = 0; i < postTags.length; i++) {
      if (postTags[i] && !tags.includes(postTags[i])) {
        tags.push(postTags[i])
      }
    }
  })

  return tags.sort()
}
