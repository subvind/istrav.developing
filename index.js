import { Command } from 'commander'
const program = new Command();

import path from 'path'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

import cp  from 'child_process'

program
  .name('istrav')
  .description('CLI to istrav functionality.')
  .version('0.0.1');

program.command('tasks')
  .description('Run a gulp task from the tasks folder.')
  .argument('<string>', 'task to call')
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

program.parse();
