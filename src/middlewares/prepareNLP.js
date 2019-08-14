// Module imports
import {
  BayesClassifier,
  WordTokenizer,
} from 'natural'
import cron from 'node-cron'
import NER from 'wink-ner'





// Local imports
import {
  downloadMovieDump,
  exportBrain,
  importBrain,
  initializeDataDirectory,
  parseMovieDump,
  trainNER,
  uncompressMovieDump,
} from '../helpers'





// Local constants
const classifier = new BayesClassifier()
const naturalInput = 'Hey MovieBot, can you please add Super Iron Man 3 to the list?'
const ner = NER()





// Train the NER system
const nlp = {
  classifier,
  ner,
  ready: false,
}

// Train Natural
// classifier.addDocument('I\'d like movie added to the list?', 'add')
// classifier.addDocument('can you add movie to the list?', 'add')
// classifier.addDocument('can you add movie to the list?', 'add')
// classifier.addDocument('please add movie to the list.', 'add')
// classifier.addDocument('add movie to the list.', 'add')
// classifier.addDocument('add movie to list.', 'add')

// classifier.events.on('trainedWithDocument', ({ doc, index, total }) => {
//   console.log('doc', doc, index, total)
//   if (index === (total - 1)) {
//     console.log('=====')
//     console.log(classifier.classify(naturalInput))
//     console.log('=====')
//   }
// })

// classifier.train()

// ;(async () => {
//   const loadMovieDataAndTrainNER = async () => {
//     await importBrain(nlp)
//     await initializeDataDirectory()
//     const movieDumpPath = await downloadMovieDump()
//     await uncompressMovieDump(movieDumpPath)
//     const trainingData = await parseMovieDump(movieDumpPath)

//     if (trainingData.length) {
//       await trainNER(ner, trainingData)
//       exportBrain(nlp)
//     }

//     nlp.ready = true

//     console.log('NLP is ready')
//   }

//   loadMovieDataAndTrainNER()
//   cron.schedule('1 1 1 * * *', () => loadMovieDataAndTrainNER(), { timezone: 'Etc/UTC' })
// })()





const prepareNLP = () => async (context, next) => {
  context.nlp = nlp

  await next()
}





export { prepareNLP }
