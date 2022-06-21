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
import { writeFile, load } from '../lib/database.js'

// database collection
import loki from 'lokijs'
let db = new loki('istrav');
let documents = db.addCollection('documents', { indices: ['language', 'utterance', 'intent'] });
let answers = db.addCollection('answers', { indices: ['language', 'intent', 'response'] });

// complete
async function saveTraining (name, data) {
  let key = `nlp/trainings/${name}`
  console.log('save training', key)
  await writeFile(key, data)
}

// perform
async function train () {
  // configuration
  let containerName = argv.container
  let containerLanguage = argv.language
  console.log('train', containerName, containerLanguage)

  // setup nlp
  const container = await containerBootstrap();
  container.use(Nlp);
  container.use(LangEn);
  const nlp = container.get('nlp');
  nlp.settings.autoSave = false;
  nlp.addLanguage(containerLanguage);

  // present documents to nlp
  let documentsKey = `nlp/documents/${containerName}`
  await load(documentsKey, documents)
  let documentData = documents.find()
  documentData.forEach((value) => {
    nlp.addDocument(value.language, value.utterance, value.intent);
  })

  // present answers to nlp
  let answersKey = `nlp/answers/${containerName}`
  await load(answersKey, answers)
  let answerData = answers.find()
  answerData.forEach((value) => {
    nlp.addAnswer(value.language, value.intent, value.response);
  })

  // start training
  await nlp.train();
  
  // finish training
  let result = nlp.toJSON()
  await saveTraining(containerName, JSON.stringify(result))
}

// tasks
export default series(
  train
)