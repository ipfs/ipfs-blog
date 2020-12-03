/**
 * Site authors:
 * Use a RFC 3986 safe key in lowercase this object
 * is merged into the $page.frontmatter.author data
 * at runtime from the original $page.frontmatter.author
 * key.
 *
 * Avatar images should be stored in the site root:
 * _assets/avatars/firstname-surname.jpg
 *
 */
module.exports = new Map([
  [
    'protocol-labs',
    {
      name: 'Protocol Labs',
      svgIcon: 'logo-icon',
      twitter: '@protocollabs',
    },
  ],
  [
    'juan-benet',
    {
      name: 'Juan Benet',
      avatar: 'juan-benet.jpg',
      twitter: '@juanbenet',
    },
  ],
  [
    'jesse-clayburgh',
    {
      name: 'Jesse Clayburgh',
      avatar: 'jessie-clayburgh.jpg',
      twitter: '@jesseclayburgh',
    },
  ],
])
