// Module imports
import { promises as fs } from 'fs'
import path from 'path'





// Local constants
const dataPath = path.resolve('data')





const exportBrain = async ({ ner, ready }) => {
  if (ready) {
    const learnings = ner.exportJSON()

    await fs.writeFile(path.resolve(dataPath, 'brain.json'), learnings, 'utf8')
  }
}





export { exportBrain }
