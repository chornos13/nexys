const yup = require('yup')
const xyup = require('./xyup')

const dict = {
  id: {
    required: {
      username: 'Username wajib diisi',
      password: 'Password wajib diisi',
    },
  },
}

const getShapeSchema = (required, language) => {
  // Default Langauge Id (Indonesia)
  const msg = Object.assign(dict.id, dict[language])
  return {
    username: yup.string().required(msg.required.username),
    password: yup.string().required(msg.required.password),
  }
}

module.exports = xyup.generateFormSchema(getShapeSchema)
