// cbadges using shields.io
const generateLicenseBadge = license => {
  return `${license === 'None' ? '' : `![alt text](https://img.shields.io/badge/License-${license}-brightgreen)`}`;
}

// cbadges using shields.io
const generateBadges = badges => {
  return `${badges.map(({badgeLabel, badgeValue, badgeColor}) => {
  // identation will create a space
  return `![alt text](https://img.shields.io/badge/${badgeLabel}-${badgeValue}-${badgeColor})` 
  })
  .join(`
  `)}
  `}

// author section
const generateCreddits = contributors => {  
  return `${contributors.map(({contributorName, contributorGithub}) => {
    return `* ${contributorGithub ? `[${contributorName}](${contributorGithub})` : contributorName}`
    })
    .join(`
  `)}
  `;
}

module.exports = markdownData => {
  // destructure page data by section
  const { license, badgesData, contributorsData, ...projectData } = markdownData;
  return `
  [comment]: <> (This readme was created by Nodinq Readme Generator)

  ${generateLicenseBadge(license)}
  ${generateBadges(badgesData)}

  # ${projectData.projectName}

  ## Description 
  ${projectData.description}

  ${projectData.needInstallation ? `
  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)
  ` : `` } 

  ${projectData.needInstallation ? '## Installation' : '' }
  ${projectData.needInstallation ? projectData.installation : '' }

  ${projectData.needUsage ? '## Usage' : '' }
  ${projectData.needUsage ? projectData.usage : '' }

  ${projectData.usageImage ? `![alt text](${projectData.usageImage})` : '' }
    
  ${projectData.features > 0 ? '## Features' : '' }
  ${projectData.features > 0 ? projectData.features : '' }
  
  ${projectData.contribution ? '## How to Contribute' : '' }
  ${projectData.contribution ? `We welcome contributions to ${projectData.projectName} on Github. When contributing, please follow our Community Code of Conduct.` : '' }
  
  ## Authors

  Contributors names:

  * ${projectData.userName}
  ${contributorsData ? generateCreddits(contributorsData) : ''}
  `;
}
