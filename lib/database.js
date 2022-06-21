// filesystem
import fs from 'fs'
import path from 'path'

// read from file system; or,
// create in file system.
let __dirname = path.resolve();
async function readOrCreateFile (key) {
  let location = __dirname + `/../${key}.json`
  let file
  try {
    file = fs.readFileSync(location)
  } catch (e) {
    file = await fs.writeFileSync(location, [].toString());
  }
  return file
}

// write to file system
async function writeFile (key, content) {
  let location = __dirname + `/../${key}.json`
  return await fs.writeFileSync(location, content.toString());
}

// read from KV database
async function load(key, collection) {
  let storageData
  let recover = await readOrCreateFile(key)
  if (recover) {
    storageData = JSON.parse(recover)
    // console.log('storageData', storageData)
    storageData.forEach((value) => {
      collection.findAndRemove({ id: value.id }) // so we don't get duplicates
      delete value['$loki'] // otherwise we get record already there error
      collection.insert(value)
    })
  }
  return collection
}

// update to KV with in-memory records
async function save(key, collection) {
  let memoryData = collection.find()
  let keep = JSON.stringify(memoryData)
  await writeFile(key, keep)
  return collection
}

// database
export {
  load,
  save,
  readOrCreateFile,
  writeFile
}