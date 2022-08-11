// cbadges using shields.io
const generateLicenseBadge = license => {
  return `${license === 'None' ? '' : `![alt text](https://img.shields.io/badge/License-${license}-brightgreen)`}`;
}

// cbadges using shields.io
const generateBadges = badges => {
  return `${badges.map(({badgeLabel, badgeValue, badgeColor}) => {
  // identation will create a space
  return `![alt text](https://img.shields.io/badge/${badgeLabel.replace(/\s+/g, ' ').trim()}-${badgeValue.replace(/\s+/g, ' ').trim()}-${badgeColor})` 
  })
  .join(`
  `)}
  `}

// features section
const generateFeatures = features => {  
  return `${features.map(({feature}) => {
    return `${feature ? `- ` + feature : ''}`
    })
    .join(`
  `)}
  `;
}

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
  const { license, badgesData, featuresData, contributorsData, ...projectData } = markdownData;
  return `
  [comment]: <> (This readme was created by Nodinq Readme Generator)

  ${generateLicenseBadge(license)}
  ${generateBadges(badgesData)}

  # ${projectData.projectName}

  ## Description 
  ${projectData.descriptionIntro}
  ${projectData.descriptionMotivation ? projectData.descriptionMotivation : ''} 
  ${projectData.descriptionWhy ? projectData.descriptionWhy : ''} 
  ${projectData.descriptionWhatSolve ? projectData.descriptionWhatSolve : ''} 
  ${projectData.descriptionLearn ? projectData.descriptionLearn : ''} 

  ${projectData.screenshot ? `## Screenshot` : '' }
  ${projectData.screenshot ? `![alt screenshot](${projectData.screenshot})` : '' }

  ${projectData.tableOfContentsConfirm ? `## Table of Contents` : ''}
  ${projectData.tableOfContentsConfirm && projectData.needInstallation ? `- [Installation](#installation)` : ''}
  ${projectData.tableOfContentsConfirm && projectData.needUsage ? `- [Usage](#usage)` : ''}
  ${projectData.tableOfContentsConfirm && projectData.featuresConfirm ? `- [Features](#features)` : ''}
  ${projectData.tableOfContentsConfirm && projectData.contribution ? `- [How to Contribute](#how-to-contribute)` : ''}
  ${projectData.tableOfContentsConfirm && (projectData.developConfirm || contributorsData) ? `- [Credits](#credits)` : ''}
  ${projectData.tableOfContentsConfirm ? `- [Questions](#questions)` : ''}

  ${projectData.needInstallation ? '## Installation' : '' }
  ${projectData.needInstallation ? projectData.installation : '' }

  ${projectData.needUsage ? '## Usage' : '' }
  ${projectData.needUsage ? projectData.usage : '' }

  ${projectData.usageImage ? `![alt usage](${projectData.usageImage})` : '' }
    
  ${projectData.featuresConfirm ? '## Features' : '' }
  ${projectData.featuresConfirm ? generateFeatures(featuresData): '' }
  
  ${projectData.contribution ? '## How to Contribute' : '' }
  ${projectData.contribution ? `We welcome contributions to ${projectData.projectName} on Github. When contributing, please follow our Community Code of Conduct.` : '' }
  
  ## Questions

  Please send your questions [here](mailto:${projectData.email}?subject=[GitHub]%20${projectData.projectName.split(' ').join('%20')}) or visit [github/${projectData.githubUserName}](https://github.com/${projectData.githubUserName}). 

  ${projectData.developConfirm || contributorsData ? '## Credits' : ''}

  ${projectData.developConfirm ? '* ' + projectData.userName : ''}
  ${contributorsData ? generateCreddits(contributorsData) : ''}
  `;
}
