import fs from 'fs'
import cp  from 'child_process'
import tap from 'gulp-tap'

import gulp from 'gulp';
const { series, parallel, src } = gulp;

let locations = []
async function taskLocations() {
  await new Promise((resolve, reject) => {
    src('../tasks/*.js')
      .pipe(
        tap(function (file, t) {
          console.log('file', file.path)
          return locations.push(file.path)
        })
      )
      .on("finish", resolve);
  })
}

// save gulp tree...
// let tree = gulp.tree({ deep: true })
// from each task to a file:

async function taskTrees() {
  console.log(JSON.stringify(locations, null, 2))
  
  await new Promise((resolve, reject) => {
    let counter = 0
    function checkComplete() {
      counter++
      if (counter === locations.length) {
        resolve()
      }
    }

    locations.forEach(async (fileName) => {
      let cmd = cp.exec(`gulp --gulpfile=${fileName} --tasks-json`)

      cmd.stdout.on('data', (data) => {
        console.log(data);
        fs.writeFile(`${fileName}.tree.json`, data, 'utf8', () => {
          checkComplete()
        });
      });
    })
  })
  return true
}

// tasks
export default series(
  taskLocations,
  taskTrees
)