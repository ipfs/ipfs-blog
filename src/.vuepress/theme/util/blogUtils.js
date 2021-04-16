export function checkItem({
  postType,
  tags,
  title,
  author = {},
  activeTags = [],
  searchedText = [],
  activeCategory = '',
  activeAuthor = '',
}) {
  if (activeCategory && decodeURI(activeCategory) !== postType) {
    return false
  }

  if (
    activeAuthor &&
    ((author.name &&
      !author.name
        .toLowerCase()
        .includes(decodeURI(activeAuthor.toLowerCase()))) ||
      !author.name)
  ) {
    return false
  }

  for (let i = 0; i < activeTags.length; i++) {
    if (!tags || !tags.includes(activeTags[i])) {
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
      author: { name: item.author },
      path: item.path,
      frontmatter: {
        ...item,
        date: item.date,
        title: item.title,
        author: { name: item.author },
        path: item.path,
        type: post.frontmatter.type,
      },
    })
  })

  return result
}
