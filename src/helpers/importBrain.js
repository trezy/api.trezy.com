// Module imports
import { promises as fs } from 'fs'
import path from 'path'





// Local constants
const dataPath = path.resolve('data')





const importBrain = async ({ ner }) => {
  console.log('Attempting to import brain...')
  try {
    const learnings = await fs.readFile(path.resolve(dataPath, 'brain.json'), 'utf8')

    ner.importJSON(learnings)

    console.log('Finished importing brain.')

    return true
  } catch (error) {
    console.log('Failed to import brain.')

    return false
  }
}





export { importBrain }
