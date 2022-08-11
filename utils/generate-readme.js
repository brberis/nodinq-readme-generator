const fs = require('fs');

const writeFile = fileContent => {
  return new Promise((resolve, reject) => {
      // remove extra spaces
      fileContent = fileContent.replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm,"");
      // add breakline after #
      let regex = /(\A|\r|\n|\r\n)#.*/g;
      let subst = "$&\n";
      fileContent = fileContent.replace(regex, subst);
      // add breakline before #
      subst = "\n$&";
      fileContent = fileContent.replace(regex, subst);
      // add breakline before usage image
      regex = /!\[alt usage\].*/g;
      subst = "\n$&";
      fileContent = fileContent.replace(regex, subst);
      fs.writeFile('./dist/README.md', fileContent, err => {
        // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
        if (err) {
          reject(err);
          // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
          return;
        }
        // if everything went well, resolve the Promise and send the successful data to the `.then()` method
        // Don't ident to console log propertly
        resolve({
        ok: true,
        message:`
        Thanks for using Nodinq Readme Generator! Your README.md is saved into ./dist folder.
        `
        });
    });
  });
};

module.exports = { writeFile };
