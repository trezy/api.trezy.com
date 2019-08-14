// Module imports
import cron from 'node-cron'





// Local imports
import {
  downloadMovieDump,
  exportBrain,
  importBrain,
  initializeDataDirectory,
  parseMovieDump,
  trainNER,
  uncompressMovieDump,
} from '.'





const loadMovieDataAndTrainNER = async nlp => {
  console.log('initializeDataDirectory', initializeDataDirectory)
  await initializeDataDirectory()
  await importBrain(nlp)
  const movieDumpPath = await downloadMovieDump()
  await uncompressMovieDump(movieDumpPath)
  const trainingData = await parseMovieDump(movieDumpPath)

  if (trainingData.length) {
    await trainNER(ner, trainingData)
    exportBrain(nlp)
  }

  nlp.ready = true

  console.log('NLP is ready')
}





export { loadMovieDataAndTrainNER }