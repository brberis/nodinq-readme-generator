const inquirer = require('inquirer');
const generateReadme = require('./src/markdown-template');
const { writeFile } = require('./utils/generate-readme.js');
const project = {};

const propmtProject = () => {
  console.log(`
  =================================
   NODINQ README GENERATOR v1.0.0
  =================================
   `);
  return inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter the project name (Required)',
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
      name: 'description',
      message: 'Provide a description of the project. (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter description!');
          return false;
        }
      }
    },
    {
      type: 'list',
      name: 'license',
      message: 'Select project license:',
      choices: ['None', 'GPLv3', 'GPLv2', 'Apache 2.0', 'BSD', 'MIT'],
      default: 'None'
    },
    {
      type: 'input',
      name: 'features',
      message: 'Provide features for this project. (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter features!');
          return false;
        }
      }
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
      message: 'Enter instructions to install the project.', 
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
      message: 'Does the project need usage information?',
      default: false,
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Enter usage information.', 
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
      message: 'Enter usage image url', 
      when: response => response.needUsage,   
    },
    {
      type: 'confirm',
      name: 'credits',
      message: 'Would you like to add contributors other than you?',
      default: false
    }

  ])
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
      message: 'Enter contributor name. (Required)',
      validate: contributorInput => {
        if (contributorInput) {
          return true
        }else{
          console.log('Please enter the project name!');
          return false
        } 
      }
    },
    {
      type: 'input',
      name: 'contributorGithub',
      message: 'Enter contributor GitHub',
      default: false
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
      message: 'Enter label. (Required)',
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
      message: 'Enter value. (Required)',
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
      message: 'Select badge color',
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

cons = projectData2 = {
  projectName: 'nombre',
  description: 'desc',
  license: 'MIT',
  features: 'wer',
  contribution: true,
  needInstallation: true,
  installation: 'installar haci',
  credits: true,
  contributorsData: [
    {
      contributorName: 'juan',
      contributorGithub: 'ewr',
      confirmAddContributor: true
    },
    {
      contributorName: 'pedro',
      contributorGithub: 'wer',
      confirmAddContributor: false
    }
  ],
  badgesData: [
    {
      badgeLabel: 'Ver.',
      badgeValue: '1.0.0',
      badgeColor: 'red',
      confirmAddBadge: false
    },
    {
      badgeLabel: 'License',
      badgeValue: 'MIT',
      badgeColor: 'green',
      confirmAddBadge: false
    }
  ]
}

//TEMPORAL

    // writeFile(generateReadme(projectData2));
  

propmtProject()
.then((projectData) => {
  if (projectData.credits) {
    return promptContributors(projectData)
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

