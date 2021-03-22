import { useEffect, useState } from 'react'
import { ExampleDir } from 'views/Home/Home'

function useDataWhatWilllearns(exampleDirs: ExampleDir[]) {
  const [listWhatWillLearns, setListWhatWillLearns] = useState([])

  useEffect(() => {
    async function getWhatWillLearns(): Promise<any[]> {
      return new Promise((resolve) => {
        Promise.all(
          exampleDirs.map((dir) => {
            return import(`examples/${dir.directory}`)
              .catch(() => null)
              .then((module) => {
                return {
                  ...module.default,
                  ...dir,
                }
              })
          }),
        ).then((value) => {
          resolve(value.filter((data) => data))
        })
      })
    }

    getWhatWillLearns().then((whatWillLearns) => {
      setListWhatWillLearns(whatWillLearns.sort((a, b) => a.order - b.order))
    })
  }, [])

  return listWhatWillLearns
}

export default useDataWhatWilllearns
