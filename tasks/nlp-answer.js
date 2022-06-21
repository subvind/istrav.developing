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
  let key = `nlp/answers/${argv.container}`
  await load(key, collection)
  let value = {
    language: argv.container,
    intent: argv.intent,
    response: argv.response,
  }
  console.log('inserting: ', value)

  // do not create duplicate records
  if (!collection.findOne(value)) {
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