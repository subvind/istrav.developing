#!/usr/bin/env node
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
const argv = yargs(hideBin(process.argv)).argv

import gulp from 'gulp';
const { series, parallel } = gulp;

async function add () {
  console.log('cool')
  console.log('adding document', argv.container)
}

export default series(
  add
)