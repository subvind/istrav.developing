#!/usr/bin/env node
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
const argv = yargs(hideBin(process.argv)).argv

// workflow
import gulp from 'gulp';
const { series, parallel } = gulp;

// database collection
import loki from 'lokijs'
let db = new loki('istrav');
let collection = db.addCollection('documents', { indices: ['language', 'utterance', 'intent'] });

// perform
import { load, save } from '../lib/database.js'
async function addDocument () {
  // configuration
  let containerName = argv.container
  let containerLanguage = argv.language
  let containerUtterance = argv.utterance
  let containerIntent = argv.intent
  console.log('add document ', containerName, containerLanguage, containerUtterance, containerIntent)

  // setup
  let key = `nlp/documents/${containerName}`
  await load(key, collection)
  console.log('setup', key)

  // record
  let value = {
    language: containerLanguage,
    utterance: containerUtterance,
    intent: containerIntent
  }
  console.log('record: ', value)

  // do not create duplicate records
  if (!collection.findOne(value)) {
    // transaction
    collection.insert(value)
    await save(key, collection)
  } else {
    console.log('No need to insert document because it already exists.')
  }
}

// tasks
export default series(
  addDocument,
)