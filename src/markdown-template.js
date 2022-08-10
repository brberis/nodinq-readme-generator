const generateBadges = badges => {

  if (badges.length < 1) {
    return '';
  }
  
  return `[comment]: <> (== badges ==)
    ${badges.map(({badgeLabel, badgeValue, badgeColor}) => {
      return `![alt text](https://img.shields.io/badge/${badgeLabel}-${badgeValue}-${badgeColor})`
    })
    .join(`
    `)}
  `}

const generateMain = projectData => {
  
  return `
  #${projectData.projectName}

  #Description
  ##${projectData.description}
  `;
}


const generateTableOfContent = projectData => {

  return `
    ${badges.map(({badgeLabel, badgeValue, badgeColor}) => {
      return `![alt text](https://img.shields.io/badge/${badgeLabel}-${badgeValue}-${badgeColor})`
    })
    .join(`
    `)}
  `;
}

const generateDetail = projectData => {

  return `
  ##${projectData.installation ? 'Installation' : '' }
  ${projectData.installation ? projectData.installation : '' }

  ##${projectData.usage ? 'Usage' : '' }
  ${projectData.usage ? projectData.usage : '' }

  ${projectData.usageImage ? `![alt text](${projectData.usageImage})` : '' }
    
  ##${projectData.features ? 'Features' : '' }
  ${projectData.features ? projectData.features : '' }

  ##${projectData.license ? 'License' : '' }
  ${projectData.license =! "None" ? projectData.license : '' }
  
  ##${projectData.contribution ? 'How to Contribute' : '' }
  ${projectData.contribution ? `We welcome contributions to ${projectData.projectName} on Github. When contributing, please follow our Community Code of Conduct.` : '' }
  `;
}


const generateCreddits = contributors => {

  if (contributors.length < 1) {
    return '';
  }
  
  return `
  ## Authors

  Contributors names:

    ${contributors.map(({contributorName, contributorGithub}) => {
      return `* [${contributorName}](${contributorGithub})`
    })
    .join(`
    `)}
  `;
}

// const generateMain = projectData => {

  
//     return `[comment]: <> (== main ==)
//     #${projectData.projectName}
  
//     #Description
//     #${projectData.description}
  
//     #${projectData.installation ? 'Installation' : '' }
//     ${projectData.installation ? projectData.installation : '' }
  
//     #${projectData.usage ? 'Usage' : '' }
//     ${projectData.usage ? projectData.usage : '' }
  
//     ${projectData.usageImage ? `![alt text](${projectData.usageImage})` : '' }
    
// `}
  
module.exports = markdownData => {
  // destructure page data by section
  const { badgesData, contributorsData, ...projectData } = markdownData;
  return `
  [comment]: <> (This readme was medy by Nodinq Readme Generator)
  ${generateBadges(badgesData)}
  ${generateMain(projectData)}
  ${generateCreddits(contributorsData)}
  `;
}
