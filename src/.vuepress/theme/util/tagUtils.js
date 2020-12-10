import { isArray } from 'lodash'

export const getTags = (posts) => {
  const tags = []

  posts.forEach((post) => {
    if (!post.frontmatter.tags) {
      return
    }

    const postTags = isArray(post.frontmatter.tags)
      ? post.frontmatter.tags
      : post.frontmatter.tags.replace(/, /g, ',').split(',')

    for (let i = 0; i < postTags.length; i++) {
      if (postTags[i] && !tags.includes(postTags[i])) {
        tags.push(postTags[i])
      }
    }
  })

  return tags.sort()
}
