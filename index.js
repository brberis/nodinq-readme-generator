const inquirer = require('inquirer');

const propmtProject = () => {
  console.log(`
  ==================
   README GENERATOR
  ==================
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
      type: 'checkbox',
      name: 'license',
      message: 'Select project license:',
      choices: ['GPLv3', 'GPLv2', 'Apache 2.0', 'BSD', 'MIT', 'None']
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
      name: 'credits',
      message: 'Would you like to add contributors other than you?',
      default: false
    }

  ])
  .then((projectData) => {
    if (projectData.credits) {
      promptContributors(projectData)
    } else {
      promptBadges(projectData)
    }
  });
}

const promptContributors =  projectData => {

  // If there's no 'contributors' array property, create one
  if (!projectData.contributors) {
    projectData.contributors = [];
    console.log(`
    Contributors:
    `);
  }
  
  return  inquirer.prompt([
    {
      type: 'input',
      name: 'contributorName',
      message: 'Enter contributor. (Required)',
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
  .then(creditsData => {
    projectData.contributors.push(creditsData);
    if (creditsData.confirmAddContributor) {
      return promptContributors(projectData);
    } else {
      return promptBadges(projectData);
    }
  })  
}

const promptBadges = projectData => {

  // If there's no 'badges' array property, create one
  if (!projectData.badges) {
    projectData.badges = [];
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
      type: 'checkbox',
      name: 'badgeColor',
      message: 'Select badge color',
      choices: ['green', 'blue', 'grey', 'red', 'orange', 'yellow']
    },
    {
      type: 'confirm',
      name: 'confirmAddBadge',
      message: 'Would you like to add another badge?',
      default: false
    }
  ])
  .then(badgeData => {
    projectData.badges.push(badgeData);
    if (badgeData.confirmAddBadge) {
      return promptBadges(projectData);
    } else {
      return projectData;
    }
  });
}


propmtProject()

  // .then(projectData => console.log(projectData)) DONT PUT This line causing undefined error

  // .then(promptBadges)