export function checkItem({
  postType,
  tags,
  title,
  author = [],
  activeTags = [],
  searchedText = [],
  activeCategory = '',
  activeAuthor,
}) {
  if (activeCategory && activeCategory.slug !== postType.slug) {
    return false
  }

  if (
    activeAuthor &&
    ((author.length > 0 &&
      !author.map((entry) => entry.slug).includes(activeAuthor.slug)) ||
      author.length === 0)
  ) {
    return false
  }

  for (let i = 0; i < activeTags.length; i++) {
    if (!tags || !tags.map((tag) => tag.slug).includes(activeTags[i])) {
      return false
    }
  }

  for (let i = 0; i < searchedText.length; i++) {
    if (
      !title.toLocaleLowerCase().includes(searchedText[i].toLocaleLowerCase())
    ) {
      return false
    }
  }

  return true
}

export function parseProtectedPost(
  post,
  activeTags = [],
  searchedText = [],
  activeCategory = '',
  activeAuthor = ''
) {
  if (!post.frontmatter.data) {
    return []
  }

  const result = []

  post.frontmatter.data.forEach((item) => {
    if (
      item.hidden ||
      !checkItem({
        postType: post.frontmatter.type,
        tags: item.tags,
        title: item.title,
        author: item.author,
        activeTags,
        searchedText,
        activeCategory,
        activeAuthor,
      })
    ) {
      return false
    }

    result.push({
      ...item,
      category: post.frontmatter.type,
      type: post.frontmatter.type,
      date: item.date,
      title: item.title,
      path: item.path,
      frontmatter: {
        ...item,
        date: item.date,
        title: item.title,
        path: item.path,
        type: post.frontmatter.type,
      },
    })
  })

  return result
}
