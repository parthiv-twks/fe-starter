const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

module.exports = function (plop) {
  plop.setGenerator('mfe-remote', {
    description: 'Create a new Microfrontend Remote',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Remote application name (e.g., dashboard, auth):'
      },
      {
        type: 'input',
        name: 'port',
        message: 'Port number for the remote:'
      }
    ],
    actions: function(data) {
      // Execute create-react-app with TypeScript template
      const remotePath = `apps/${data.name}`;
      try {
        execSync(`npx create-react-app ${remotePath} --template typescript`, { stdio: 'inherit' });

        // Add necessary configurations
        // const packageJsonPath = path.join(remotePath, 'package.json');
        // const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        // packageJson.scripts.start = `PORT=${data.port} craco start`;
        // packageJson.scripts.dev = "yarn start";
        // packageJson.scripts.test = "craco build";
        // packageJson.scripts.build = "craco build";
        // fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      } catch (error) {
        console.error('Error creating React app:', error);
        process.exit(1);
      }

      return [
        {
          type: 'add',
          path: `${remotePath}/craco.config.js`,
          templateFile: 'templates/craco.config.js.hbs'
        },
        {
          type: 'add',
          path: `${remotePath}/package.json`,
          templateFile: 'templates/package.json.hbs',
          force:true,
        },
       
        {
          type: 'add',
          path: `${remotePath}/src/bootstrap.tsx`,
          templateFile: 'templates/bootstrap.js.hbs'
        },
        {
          type: 'add',
          path: `${remotePath}/src/router.tsx`,
          templateFile: 'templates/router.js.hbs'
        },
        {
          type: 'add',
          path: `${remotePath}/src/index.tsx`,
          templateFile: 'templates/index.js.hbs',
          force: true,
        } ,
      ];
    }
  });
};
