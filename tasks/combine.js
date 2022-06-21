import gulp from 'gulp';
const { series, parallel } = gulp;

import log from './log.js'
import markov from './markov.js'

// tasks
export default series(log, markov)