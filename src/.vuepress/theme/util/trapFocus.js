// eslint-disable-next-line default-param-last
export default function trapFocus(tabItems = [], escapeCallback, e) {
  const keyCode = e.keyCode || e.which

  if (keyCode === 27) {
    // Handles escape key

    if (escapeCallback) {
      escapeCallback()
    }
  } else if (
    e.target === tabItems[tabItems.length - 1] &&
    !e.shiftKey &&
    keyCode === 9
  ) {
    // Handles tabbing past the last menu item to return to menu toggle button

    e.preventDefault()
    tabItems[0].focus()
  } else if (e.target === tabItems[0] && e.shiftKey && keyCode === 9) {
    // Handles shift-tabbing past the first menu item
    e.preventDefault()
    tabItems[tabItems.length - 1].focus()
  } else if (keyCode === 32) {
    // Handles spacebar for click
    // e.target.click()
  }
}
