const LIBRE_URL =
  process.env.LIBRE_URL ||
  'http://54.169.146.220:9980/loleaflet/dist/loleaflet.html?file_path='

function getEditorURL(filePath) {
  return [LIBRE_URL, filePath].join('')
}

export default {
  getEditorURL,
}
