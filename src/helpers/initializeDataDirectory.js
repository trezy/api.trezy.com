// Module imports
import { promises as fs } from 'fs'
import path from 'path'





const initializeDataDirectory = async () => {
  try {
    await fs.mkdir(path.resolve('data'))
  } catch (error) {}
}





export { initializeDataDirectory }
