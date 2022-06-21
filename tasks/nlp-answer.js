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
let collection = db.addCollection('answers', { indices: ['language', 'intent', 'response'] });

// perform
import { load, save } from '../lib/database.js'
async function addAnswer () {
  // configuration
  let containerName = argv.container
  let containerLanguage = argv.language
  let containerIntent = argv.intent
  let containerResponse = argv.response
  console.log('add answer ', containerName, containerLanguage, containerIntent, containerResponse)

  // setup
  let key = `nlp/answers/${argv.container}`
  await load(key, collection)

  // record
  let value = {
    language: containerLanguage,
    intent: containerIntent,
    response: containerResponse,
  }
  console.log('record: ', value)

  // do not create duplicate records
  if (!collection.findOne(value)) {
    // transaction
    collection.insert(value)
    await save(key, collection)
  } else {
    console.log('No need to insert answer because it already exists.')
  }
}

// tasks
export default series(
  addAnswer,
)