import { Command } from 'commander'
const program = new Command();

import cp  from 'child_process'

program
  .name('network-ai')
  .description('CLI to network-ai functionality.')
  .version('0.0.1');

program.command('tasks')
  .description('Run a gulp task from the tasks folder.')
  .argument('<string>', 'task to call')
  // .option('--first', 'display just the first substring')
  // .option('-s, --separator <char>', 'separator character', ',')
  .action((fileName, options) => {
    let cmd = cp.exec(`gulp --gulpfile=./tasks/${fileName}.js`)

    cmd.stdout.on('data', (data) => {
      console.log(data.toString());
    });
  });

program.parse();
