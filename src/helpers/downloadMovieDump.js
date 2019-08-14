// Module imports
import fetch from 'node-fetch'
import { promises as fsPromise } from 'fs'
import fs from 'fs'
import moment from 'moment'
import path from 'path'
import util from 'util'





// Local constants
const downloadDateFormat = 'Y-MM-DD'
const dataFolder = path.resolve('data')





const downloadMovieDump = async () => {
  const today = moment.utc()
  const movieDumpPath = path.resolve(dataFolder, `${today.format(downloadDateFormat)}`)
  const compressedMovieDumpPath = `${movieDumpPath}.gz`
  const parsedMovieDumpPath = `${movieDumpPath}.json`

  let movieDumpExists = false
  let parsedMovieDumpExists = false
  let compressedMovieDumpExists = false

  try {
    await fsPromise.access(movieDumpPath)
    movieDumpExists = true
  } catch (error) {}

  try {
    await fsPromise.access(parsedMovieDumpPath)
    parsedMovieDumpExists = true
  } catch (error) {}

  try {
    await fsPromise.access(compressedMovieDumpPath)
    compressedMovieDumpExists = true
  } catch (error) {}

  if (!parsedMovieDumpExists && !movieDumpExists && !compressedMovieDumpExists) {
    console.log('Downloading movie dump...')

    // Movie title data dump from https://www.imdb.com/interfaces/
    const response = await fetch('https://datasets.imdbws.com/title.akas.tsv.gz')
    const writeStream = fs.createWriteStream(compressedMovieDumpPath)

    await new Promise(resolve => {
      writeStream.on('finish', resolve)
      response.body.pipe(writeStream)
    })

    writeStream.end()

    console.log('Finished downloading movie dump.')
  }

  return movieDumpPath
}





export { downloadMovieDump }
