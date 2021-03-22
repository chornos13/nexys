import Home from 'views/Home/Home'
import fs from 'fs'

export async function getServerSideProps() {
  const filePath = [process.cwd(), 'src', 'examples'].join('/')

  const listDir = fs.readdirSync(filePath)

  const exampleDirs = await Promise.all(
    listDir.map((directory) => {
      return new Promise((resolve) => {
        fs.readdir([filePath, directory].join('/'), (err, files) => {
          resolve({ directory, totalFiles: files.length })
        })
      })
    }),
  )

  return {
    props: {
      exampleDirs,
    },
  }
}

export default Home
