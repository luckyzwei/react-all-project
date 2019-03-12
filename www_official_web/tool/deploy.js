const evJson = JSON.parse(process.env.npm_config_argv)
const key = evJson.original[2] !=undefined ? evJson.original[2].slice(2) : ''
var chalk = require('chalk');
const util = require('util');
const _exec = require('child_process').exec
const exec = util.promisify(_exec);

async function runExec(cmd1,cmd2) {
  console.log('Creating an optimized production build...');
  const { error, stdout, stderr } = await exec(cmd1);
  console.log('----------');
  if(error){
    console.error(`exec error: ${error}`);
    process.exit(1)
  }else {
    console.log(chalk.green('Compiled successfully.'));
    _exec(cmd2,(error, stdout, stderr) => {
      if(error){
        console.error(chalk.red(`exec error: ${error}`));
        process.exit(1)
      }else {
        console.log(chalk.green('upload successfully!'));
        process.exit(0)
      }
    })
  }
}
// `scp -i ${key} -r ./build/* ubuntu@54.222.161.75:/var/www/gemiimain/`

// cp -r ./build/* ../gemiimain/
runExec(`sudo npm run build`,'sudo cp -r ./build/* ../gemiimain/')
