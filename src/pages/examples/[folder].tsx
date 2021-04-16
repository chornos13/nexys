import fs from 'fs'
import path from 'path'
import ListExample from 'views/Examples/ListExample/ListExample'

function readDirExamples(dir) {
  const filePath = [process.cwd(), 'src/@nexys', 'examples', dir].join('/')
  return fs.readdirSync(filePath)
}

export async function getServerSideProps(ctx) {
  const { folder } = ctx.query

  const index = []
  const filenames = readDirExamples(folder)
  let information = {}

  filenames.forEach((filename) => {
    // eslint-disable-next-line
    const file = require(`@nexys/examples/${folder}/${filename}`)

    if (filename.startsWith('index.')) {
      information = {
        ...file.default,
      }
      return
    }

    const filePath = [
      process.cwd(),
      'src/@nexys',
      'examples',
      folder,
      filename,
    ].join('/')
    const sourceCode = fs.readFileSync(filePath, {
      encoding: 'utf-8',
    })

    index.push({
      ...file.$metadata,
      filename,
      sourceCode: sourceCode.replace(
        /export const \$metadata(\s|)+=.*?({.*?\s})(?=\s|$)(\s)+/gs,
        '',
      ),
      url: [
        'docs',
        folder,
        path.basename(filename, path.extname(filename)),
      ].join('/'),
    })
  })

  return {
    props: {
      index,
      folder,
      information,
    },
  }
}

export default ListExample
