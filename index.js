const inquirer = require('inquirer');
const generateReadme = require('./src/markdown-template');
const { writeFile } = require('./utils/generate-readme.js');

const propmtProject = () => {
  console.log(`
  =================================
   NODINQ README GENERATOR v1.0.0
  =================================
   `);
  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'developConfirm',
      message: 'Did you develop this project?',
      default: true
    },
    {
      type: 'input',
      name: 'userName',
      message: 'Enter your name: (Required)',
      when: response => response.developConfirm,   
      validate: nameInput => {
        if (nameInput) {
          return true
        }else{
          console.log('Please enter your name!');
          return false
        } 
      }
    },
    {
      type: 'input',
      name: 'githubUserName',
      message: 'Enter your GitHub: (Required)',
      validate: githubNameInput => {
        if (githubNameInput) {
          return true
        }else{
          console.log('Please enter your GitHun username!');
          return false
        } 
      }
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email: (Required)',
      validate: emailInput => {
        if (emailInput) {
          return true
        }else{
          console.log('Please enter your email!');
          return false
        } 
      }
    },
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter the project name: (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true
        }else{
          console.log('Please enter the project name!');
          return false
        } 
      }
    },
    {
      type: 'input',
      name: 'descriptionIntro',
      message: 'Provide the description introduction of the project: (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter description introduction!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'descriptionMotivation',
      message: 'What was your motivation? (Optional)',
    },
    {
      type: 'input',
      name: 'descriptionWhy',
      message: 'Why did you build this project? (Optional)',
    },
    {
      type: 'input',
      name: 'descriptionWhatSolve',
      message: 'What problem does it solve? (Optional)',
    },
    {
      type: 'input',
      name: 'descriptionLearn',
      message: 'What did you learn? (Optional)',
    },
    {
      type: 'input',
      name: 'screenshot',
      message: 'Add s screenshot URL: (Optional)',
    },
    {
      type: 'list',
      name: 'license',
      message: 'Select project license:',
      choices: ['None', 'GPLv3', 'GPLv2', 'Apache2.0', 'BSD', 'MIT'],
      default: 'None'
    },
    {
      type: 'confirm',
      name: 'tableOfContentsConfirm',
      message: 'Would you like to add table of contents?',
      default: false
    },
    {
      type: 'confirm',
      name: 'featuresConfirm',
      message: 'Would you like to add features?',
      default: false
    },
    {
      type: 'confirm',
      name: 'credits',
      message: 'Would you like to add contributors?',
      default: false
    },
    {
      type: 'confirm',
      name: 'contribution',
      message: 'Would you like people to contrinute to this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'needInstallation',
      message: 'Does the project need instalation?',
      default: false,
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Enter instructions to install the project:', 
      when: response => response.needInstallation,   
      validate: installationInfo => {
        if (installationInfo) {
          return true;
        } else {
          console.log('Please enter instructions!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'needUsage',
      message: 'Do you want to add Usage information?',
      default: false,
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Enter usage information:', 
      when: response => response.needUsage,   
      validate: usageInfo => {
        if (usageInfo) {
          return true;
        } else {
          console.log('Please enter usage instructions!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'usageImage',
      message: 'Enter usage image URL: (Optional)', 
      when: response => response.needUsage,   
    },
    {
      type: 'input',
      name: 'testIntructions',
      message: 'Enter test instructions: (Optional)', 
      when: response => response.needInstallation,   
    },
  ])
}

const promptFeatures =  projectData => {

  // If there's no 'features' array property, create one
  if (!projectData.featuresData) {
    projectData.featuresData = [];
    console.log(`
    Features:
    `);
  }
  
  return  inquirer.prompt([
    {
      type: 'input',
      name: 'feature',
      message: 'Enter feature: (Required)',
      validate: featureInput => {
        if (featureInput) {
          return true
        }else{
          console.log('Please enter feature!');
          return false
        } 
      }
    },
    {
      type: 'confirm',
      name: 'confirmAddFeature',
      message: 'Would you like to add another feature?',
      default: false
    }
  ])
  .then(feature => {
    projectData.featuresData.push(feature);
    if (projectData.featuresData[projectData.featuresData.length - 1].confirmAddFeature) {
      return promptFeatures(projectData);
    } else {
      return projectData;
    }
  })  
}

const promptContributors =  projectData => {

  // If there's no 'contributors' array property, create one
  if (!projectData.contributorsData) {
    projectData.contributorsData = [];
    console.log(`
    Contributors:
    `);
  }
  
  return  inquirer.prompt([
    {
      type: 'input',
      name: 'contributorName',
      message: 'Enter contributor name: (Required)',
      validate: contributorInput => {
        if (contributorInput) {
          return true
        }else{
          console.log('Please enter contributor name!');
          return false
        } 
      }
    },
    {
      type: 'input',
      name: 'contributorGithub',
      message: 'Enter contributor GitHub: (Optional)',
    },
    {
      type: 'confirm',
      name: 'confirmAddContributor',
      message: 'Would you like to add another contributor?',
      default: false
    }
  ])
  .then(contributor => {
    projectData.contributorsData.push(contributor);
    if (projectData.contributorsData[projectData.contributorsData.length - 1].confirmAddContributor) {
      return promptContributors(projectData);
    } else {
      return projectData;
    }
  })  
}

const promptBadges = projectData => {
  // If there's no 'badges' array property, create one
  if (!projectData.badgesData) {
    projectData.badgesData = [];
    console.log(`
    Badges:
    `);
  }  

  return inquirer.prompt([
    {
      type: 'input',
      name: 'badgeLabel',
      message: 'Enter label: (Required)',
      validate: labelInput => {
        if (labelInput) {
          return true
        }else{
          console.log('Please enter label!');
          return false
        } 
      }
    },
    {
      type: 'input',
      name: 'badgeValue',
      message: 'Enter value: (Required)',
      validate: valueInput => {
        if (valueInput) {
          return true
        }else{
          console.log('Please enter value!');
          return false
        } 
      }
    },
    {
      type: 'list',
      name: 'badgeColor',
      message: 'Select badge color:',
      choices: ['green', 'blue', 'lightgrey', 'red', 'orange', 'yellow'],
      default: 'green'

    },
    {
      type: 'confirm',
      name: 'confirmAddBadge',
      message: 'Would you like to add another badge?',
      default: false
    }
  ])
  .then(badge => {
    projectData.badgesData.push(badge);
    if (projectData.badgesData[projectData.badgesData.length -1].confirmAddBadge) {
      return promptBadges(projectData);
    } else {
      return projectData;
    }
  });
}

// function call
propmtProject()
.then((projectData) => {
  if (projectData.featuresConfirm) {
    return promptFeatures(projectData)
  } else {
    return projectData;
  }
})
.then((projectData) => {
  if (projectData.credits) {
    return promptContributors(projectData)
  } else {
    return projectData;
  }
})
.then((projectData) => {
  return promptBadges(projectData); 
})
.then(projectData => {
  return generateReadme(projectData);
})
.then(readmeFile => {
  readmeFile = readmeFile;
  return writeFile(readmeFile);
})
.then(result => {
  console.log(result.message);
})
.catch(err => {
  console.log(err);
});