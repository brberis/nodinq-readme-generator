const inquirer = require('inquirer');

const propmtUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter the project name',
      validate: nameInput => {
        if (nameInput) {
          return true
        }else{
          console.log('Please enter the project name!');
          return false
        } 
      }
    }
  ])
}

propmtUser();