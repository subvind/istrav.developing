import gulp from 'gulp';
const { series, parallel } = gulp;

async function clean () {
  console.log('clean')
}

async function js () {
  console.log('js')
}

async function css () {
  console.log('css')
}

async function img () {
  console.log('img')
}

async function deploy () {
  console.log('deploy')
}

export default series(
  clean,
  parallel(js, css , img),
  deploy
)