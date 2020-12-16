export const checkItem = ({
  postType,
  tags,
  title,
  activeTags = [],
  searchedText = [],
  activeCategory = '',
}) => {
  if (activeCategory && decodeURI(activeCategory) !== postType) {
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

export const parseProtectedPost = (
  post,
  activeTags = [],
  searchedText = [],
  activeCategory = ''
) => {
  if (!post.frontmatter.data) {
    return []
  }

  const result = []

  post.frontmatter.data.forEach((item) => {
    if (
      !checkItem({
        postType: post.frontmatter.type,
        tags: item.tags,
        title: item.title,
        activeTags,
        searchedText,
        activeCategory,
      })
    ) {
      return false
    }

    result.push({
      category: post.frontmatter.type,
      type: post.frontmatter.type,
      date: item.date,
      title: item.title,
      path: item.path,
      ...item,
      frontmatter: {
        date: item.date,
        title: item.title,
        path: item.path,
        ...item,
      },
    })
  })

  return result
}
