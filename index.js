import { Command } from 'commander'
const program = new Command();

import path from 'path'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

import cp  from 'child_process'

program
  .name('Network AI')
  .description('Here are the CLI docs for interacting with our\nlocal servers behind ... https://istrav.dev\n\nNetwork AI:\n- Run a command ... > tasks log\n- Platforms integration ... /community_folder/ Hello there!\n- Direct messaging ... @john: Hello there!\n- Default ... Hello there!')
  .version('0.0.1');

program.command('tasks')
  .description('Run a gulp task from the tasks folder.')
  .argument('<gulpfile>', 'task to call')
  // .option('--first', 'display just the first substring')
  // .option('-s, --separator <char>', 'separator character', ',')
  .action((fileName, options) => {
    let cmd = cp.exec(`gulp --gulpfile=${__dirname}/tasks/${fileName}.js`)

    cmd.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    cmd.stderr.on('data', (data) => {
      console.log(data.toString());
    });
  });

program.command('nlp-document')
  .description('Add an utterance and intent for the NLP.')
  .argument('<container>', 'data silo')
  .argument('<language>', 'the language to use')
  .argument('<utterance>', 'what is being said')
  .argument('<intent>', 'purpose of utterance')
  .action((container, language, utterance, intent, options) => {
    let cmd = cp.exec(`gulp --gulpfile=${__dirname}/tasks/nlp-document.js --container="${container}"  --language="${language}"  --utterance="${utterance}"  --intent="${intent}"`)

    cmd.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    cmd.stderr.on('data', (data) => {
      console.log(data.toString());
    });
  });

program.command('nlp-answer')
  .description('Add an intent and response for the NLP.')
  .argument('<container>', 'data silo')
  .argument('<language>', 'the language to use')
  .argument('<intent>', 'match purpose')
  .argument('<response>', 'what to say')
  .action((container, language, intent, response, options) => {
    let cmd = cp.exec(`gulp --gulpfile=${__dirname}/tasks/nlp-answer.js --container="${container}"  --language="${language}"  --intent="${intent}"  --response="${response}"`)

    cmd.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    cmd.stderr.on('data', (data) => {
      console.log(data.toString());
    });
  });

program.command('nlp-train')
  .description('Teach a program how to act using documents and answers.')
  .argument('<container>', 'data silo')
  .argument('<language>', 'the language to use')
  .action((container, language, options) => {
    let cmd = cp.exec(`gulp --gulpfile=${__dirname}/tasks/nlp-train.js --container="${container}"  --language="${language}"`)

    cmd.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    cmd.stderr.on('data', (data) => {
      console.log(data.toString());
    });
  });

program.command('nlp-process')
  .description('Tell a trained program something.')
  .argument('<container>', 'data silo')
  .argument('<language>', 'the language to use')
  .argument('<run>', 'the text to process')
  .action((container, language, run, options) => {
    let cmd = cp.exec(`gulp --gulpfile=${__dirname}/tasks/nlp-process.js --container="${container}"  --language="${language}" --run="${run}"`)

    cmd.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    cmd.stderr.on('data', (data) => {
      console.log(data.toString());
    });
  });

program.command('platform-run')
  .description('Tell PM2 to run a new platform process.')
  .argument('<name>', 'reference id')
  .action((name, options) => {
    let cmd = cp.exec(`gulp --gulpfile=${__dirname}/tasks/platform-run.js --name="${name}"`)

    cmd.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    cmd.stderr.on('data', (data) => {
      console.log(data.toString());
    });
  });

program.command('platform-stop')
  .description('Tell PM2 to stop a running platform process.')
  .argument('<name>', 'reference id')
  .action((name, options) => {
    let cmd = cp.exec(`gulp --gulpfile=${__dirname}/tasks/platform-stop.js --name="${name}"`)

    cmd.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    cmd.stderr.on('data', (data) => {
      console.log(data.toString());
    });
  });

program.command('platform-logs')
  .description('Tell PM2 to show us the latest logs from a platform.')
  .argument('<name>', 'reference id')
  .option('--lines', 'number of logs to show', 100)
  .action((name, options) => {
    let cmd = cp.exec(`gulp --gulpfile=${__dirname}/tasks/platform-logs.js --name="${name}" --lines="${options.lines}"`)

    cmd.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    cmd.stderr.on('data', (data) => {
      console.log(data.toString());
    });
  });

program.parse();
