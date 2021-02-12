import fs from 'fs'

export default function getSourceCode(path) {
  const filePath = [process.cwd(), 'src', path].join('/')
  return fs.readFileSync(filePath, {
    encoding: 'utf-8',
  })
}
