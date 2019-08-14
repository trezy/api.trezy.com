// Module imports
import { promises as fsPromise } from 'fs'
import fs from 'fs'





const parseMovieDump = async movieDumpPath => {
  let parsedMovieDumpExists = false
  let parsedMovieDumpPath = `${movieDumpPath}.json`
  let movieDumpExists = false

  try {
    await fsPromise.access(parsedMovieDumpPath)
    parsedMovieDumpExists = true
  } catch (error) {}
  try {
    await fsPromise.access(movieDumpPath)
    movieDumpExists = true
  } catch (error) {}

  if (!parsedMovieDumpExists && movieDumpExists) {
    console.log('Parsing data dump...')

    const result = []

    await new Promise(async (resolve, reject) => {
      const readStream = fs.createReadStream(movieDumpPath)
      const writeStream = fs.createWriteStream(`${movieDumpPath}.json`)
      let currentRow = ''
      let headers = null

      const parseRow = row => {
        const columns = row.split('\t')
        const regionColumnIndex = headers.indexOf('region')

        const region = columns[regionColumnIndex]

        if (region !== 'US') {
          return null
        }

        const titleColumnIndex = headers.indexOf('title')
        const titleIDColumnIndex = headers.indexOf('titleId')

        const title = columns[titleColumnIndex]
        const titleID = columns[titleIDColumnIndex]

        return {
          text: title,
          entityType: 'movie',
          uid: titleID,
        }
      }

      readStream.on('data', chunk => {
        let string = chunk.toString('utf8')
        let newlineIndex = string.indexOf('\n')

        if (string.indexOf('\n') !== -1) {
          const rows = string.split('\n')

          currentRow += rows.shift()

          if (!headers) {
            headers = currentRow.split('\t')
          } else {
            const parsedRow = parseRow(currentRow)

            if (parsedRow) {
              result.push(parsedRow)
            }
          }

          currentRow = rows.pop()

          for (const row of rows) {
            const parsedRow = parseRow(row)

            if (parsedRow) {
              result.push(parsedRow)
            }
          }
        } else {
          currentRow += string
        }
      })

      readStream.on('end', async () => {
        writeStream.end(JSON.stringify(result), 'utf8')

        await fsPromise.unlink(movieDumpPath, () => {})

        console.log('Finished parsing data dump.')

        resolve(result)
      })

      readStream.on('error', reject)
      writeStream.on('error', reject)
    })

    return result
  }

  if (parsedMovieDumpExists) {
    const parsedMovieDump = await fsPromise.readFile(parsedMovieDumpPath, 'utf8')

    return JSON.parse(parsedMovieDump)
  }

  return []
}





export { parseMovieDump }
