// Module imports
import fetch from 'node-fetch'
import { promises as fsPromise } from 'fs'
import fs from 'fs'
import gunzip from 'gunzip-file'
import moment from 'moment'
import path from 'path'
import util from 'util'





// Local constants
const downloadDateFormat = 'Y-MM-DD'
const dataFolder = path.resolve('data')
const gunzipPromise = util.promisify(gunzip)





const uncompressMovieDump = async movieDumpPath => {
  const compressedMovieDumpPath = `${movieDumpPath}.gz`

  let movieDumpExists = false
  let compressedMovieDumpExists = false

  try {
    await fsPromise.access(`${movieDumpPath}`)
    movieDumpExists = true
  } catch (error) {}

  try {
    await fsPromise.access(compressedMovieDumpPath)
    compressedMovieDumpExists = true
  } catch (error) {}

  if (compressedMovieDumpExists) {
    if (!movieDumpExists) {
      console.log('Uncompressing movie dump...')
      await gunzipPromise(compressedMovieDumpPath, movieDumpPath)
      console.log('Finished uncompressing movie dump.')
    }

    console.log('Deleting compressed movie dump...')
    await fsPromise.unlink(compressedMovieDumpPath, () => {})
    console.log('Finished deleting compressed movie dump.')
  }
}





export { uncompressMovieDump }
