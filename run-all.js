// const { spawn } = require('child_process');
// const child = spawn('npm run api');

const npmRun = require('npm-run');
const chalk = require('chalk');

const stringifyAndTrim = (data) => (data + '').trim()

const processes = [
  {
  //   name: '__base',
  //   script: 'run __base',
  //   stdoutFn: chalk.red,
  //   stderrFn: chalk.bgRed
  // }, {
    name: 'public',
    script: 'run svc-public',
    stdoutFn: chalk.red,
    stderrFn: chalk.bgRed
  }, {
    name: 'employees',
    script: 'run svc-employees',
    stdoutFn: chalk.blue,
    stderrFn: chalk.bgBlue
  }, {
    name: 'projects',
    script: 'run svc-projects',
    stdoutFn: chalk.green,
    stderrFn: chalk.bgGreen
  }, {
    name: 'benefits',
    script: 'run svc-benefits',
    stdoutFn: chalk.cyan,
    stderrFn: chalk.bgCyan
  // }, {
  //   name: 'geo',
  //   script: 'run svc-geo',
  //   stdoutFn: chalk.magenta,
  //   stderrFn: chalk.bgMagenta
  // }, {
  //   name: 'skills',
  //   script: 'run svc-skills',
  //   stdoutFn: chalk.gray,
  //   stderrFn: chalk.bgGray
  }
]

processes.forEach(({ name, script, stdoutFn, stderrFn }) => {

  // default solution
  const child = npmRun.spawn(
    'npm',
    script.split(' ')
    // 'run api'.split(' ')
  )
  // windows fallback
  // https://stackoverflow.com/questions/43230346/error-spawn-npm-enoent
  // const child = npmRun.spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', script.split(' '));
  
  child.stdout.on('data', (data) => {
    console.log(stdoutFn(name, '>', stringifyAndTrim(data)));
  });
  
  child.stderr.on('data', (data) => {
    console.error(name, '>', stderrFn(stringifyAndTrim(data)));
  });
});
