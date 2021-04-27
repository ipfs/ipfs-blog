import orderBy from 'lodash/orderBy'

export const getTags = (activeTags, posts) => {
  const tags = [...activeTags]

  posts.forEach((post) => {
    if (!post.frontmatter.tags) {
      return
    }

    const postTags = post.frontmatter.tags

    for (let i = 0; i < postTags.length; i++) {
      if (postTags[i] && !tags.find((tag) => tag.slug === postTags[i].slug)) {
        tags.push(postTags[i])
      }
    }
  })

  return orderBy(tags, 'name')
}
