#!/usr/bin/env node
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
const argv = yargs(hideBin(process.argv)).argv

// workflow
import gulp from 'gulp';
const { series, parallel } = gulp;

// nlp
import { containerBootstrap } from '@nlpjs/core'
import { Nlp } from '@nlpjs/nlp'
import { LangEn } from '@nlpjs/lang-en-min'

// database
import { readOrCreateFile } from '../lib/database.js'

// init
async function loadTraining (name) {
  let key = `nlp/trainings/${name}`
  console.log('load training from', key)
  return await readOrCreateFile(key)
}

// perform
async function processData () {
  // configuration
  let containerName = argv.container
  let containerLanguage = argv.language
  let containerRun = argv.run
  console.log('process data', containerName, `"${containerRun}"`)

  // setup nlp
  const container = await containerBootstrap();
  container.use(Nlp);
  container.use(LangEn);
  const nlp = container.get('nlp');
  nlp.settings.autoSave = false;
  nlp.addLanguage(containerLanguage);

  // setup training
  let data = await loadTraining(containerName)
  // console.log('setup training', data)
  await nlp.fromJSON(JSON.parse(data))
  
  // process
  const response = await nlp.process(containerLanguage, containerRun);
  console.log(response.answer);
}

// tasks
export default series(
  processData
)