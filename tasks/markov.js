import gulp from 'gulp';
const { series, parallel } = gulp;

import Markov from '../js-markov/index.js'

// return generated string length
let order = 100

// If you are generating words
var markov = new Markov();
markov.addStates([
  'Today is sunny',
  'Today is rainy',
  'The weather is sunny',
  'The weather for tomorrow might be rainy'
]);

// If you are generating numbers
// var markov = new Markov('numeric);
// markov.addStates([
//   {
//     state: 1,
//     predictions: [
//       2, 3
//     ]
//   },
//   {
//     state: 2,
//     predictions: [1, 3]
//   },
//   {
//     state: 3,
//     predictions: [2, 1]
//   }
// ]);

async function train () {
  markov.train();
}

let response
async function generate () {
  response = markov.generateRandom(order)
}

async function log () {
  console.log(response)
}

// tasks
export default series(
  train,
  generate,
  log
)