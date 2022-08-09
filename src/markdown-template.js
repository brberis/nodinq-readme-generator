const generateBadges = badges => {

if (badges.length < 1) {
  return '';
}

return `[comment]: <> (== badges ==)
  ${badges.map(({badgeLabel, badgeValue, badgeColor}) => {
    return `![alt text](https://img.shields.io/badge/${badgeLabel}-${badgeValue}-${badgeColor})`
  })
  .join('')}
`}

const generateCreddits = contributors => {

  if (contributors.length < 1) {
    return '';
  }
  
  return `[comment]: <> (== contributors ==)
    ${contributors.map(({contributorName, contributorGithub}) => {
      return `* [${contributorName}](${contributorGithub})`
    })
    .join('')}
  `}

module.exports = markdownData => {
  // destructure page data by section
  const { badges, contributors } = markdownData;
  return `
  [comment]: <> (This readme was medy by Nodinq Readme Generator)
  ${generateBadges(badges)}
  ${generateCreddits(contributors)}
  `;
}
