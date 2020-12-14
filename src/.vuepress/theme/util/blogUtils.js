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
    if (activeCategory && decodeURI(activeCategory) !== post.frontmatter.type) {
      return false
    }

    for (let i = 0; i < activeTags.length; i++) {
      if (!item.tags || !item.tags.includes(activeTags[i])) {
        return false
      }
    }

    for (let i = 0; i < searchedText.length; i++) {
      if (!item.title.includes(searchedText[i])) {
        return false
      }
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

  //     return post.frontmatter.data.map((item) => {

  //     return {
  //       type: post.frontmatter.type,
  //       date: item.date,
  //       title: item.title,
  //       path: item.path,
  //       ...item,
  //       frontmatter: {
  //         date: item.date,
  //         title: item.title,
  //         path: item.path,
  //         ...item,
  //       },
  //     }
  //   })
}
